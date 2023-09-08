import { Injectable, inject } from "@angular/core";
import { TmdbService } from "./tmdb.service";
import { ApiResponse, Movie } from "../models";
import { forkJoin, map, Subject, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private tmdbService = inject(TmdbService);
  private favorites: Array<Movie> = [];

  private favoritesChanged = new Subject<Array<Movie>>();
  public favoritesChanged$ = this.favoritesChanged.asObservable();


  loadFavorites(): void {
    this.favorites = [];

    this.tmdbService.getFavorites()
      .pipe(take(1))
      .subscribe({
        next: (favoriteResponse: ApiResponse<Movie>) => this.getFirstResponse(favoriteResponse),
      });
  }

  addMovieToFavorites(movie: Movie): void {
    this.tmdbService.addFavorite(movie.id).subscribe({
      next: () => this.handleAddFavorite(movie),
      error: error => console.error(error),
    });
  }

  removeMovieToFavorites(movie: Movie): void {
    this.tmdbService.removeFavorite(movie.id).subscribe({
      next: (response) => this.handleRemoveFavorite(movie),
      error: error => console.error(error),
    });
  }

  getFavorites(): Array<Movie> {
    return this.favorites;
  }

  private getFirstResponse(favoriteResponse: ApiResponse<Movie>): void {
    const { results, total_pages } = favoriteResponse;
    this.favorites = results || [];
    this.getRestFavorites(total_pages);
  }

  // ! This method can be throw some errors, because we have a API restriction to 40 request per minute.
  private getRestFavorites(total_pages: number): void {
    if (total_pages === 1) {
      return;
    }

    let calls: any = {};
    for (let i = 2; i <= total_pages; i++) {
      calls[i.toString()] = this.tmdbService.getFavorites(i).pipe(map((response) => response.results));
    }
    forkJoin(calls)
      .pipe(take(1))
      .subscribe({
        next: (responses: any) => this.handleFavoriteForkJoin(responses),
      });
  }

  private handleFavoriteForkJoin(responses: any): void {
    const keys = Object.keys(responses)
    keys.forEach((key) => {
      this.favorites.push(...responses[key]);
    });
    this.favoritesChanged.next(this.favorites);
  }

  private handleAddFavorite(movie: Movie): void {
    if (!movie) {
      return;
    }
    this.favorites.push(movie);
    this.favoritesChanged.next(this.favorites);
  }

  private handleRemoveFavorite(movie: Movie): void {
    this.favorites = this.favorites.filter((item) => item.id !== movie.id);
    this.favoritesChanged.next(this.favorites);
  }
}
