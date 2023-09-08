import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil} from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';

import { ApiResponse, Movie } from '../../models';
import { TmdbService } from '../../services/tmdb.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private movieResponse!: ApiResponse<Movie>;
  private favoriteMovies!: Array<Movie>;

  movies!: Movie[];
  page = 1;
  totalPages = 1;
  pageList: number[] = [];

  readonly tmdbService = inject(TmdbService);
  readonly favoriteService = inject(FavoriteService);

  ngOnInit(): void {
    this.favoriteService.loadFavorites();
    this.goToPage(1);
    this.handleFavoriteMoviesChanged();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddToFavorite(movie: Movie): void {
   this.favoriteService.addMovieToFavorites(movie);
  }

  onRemoveToFavorite(movie: Movie): void {
    this.favoriteService.removeMovieToFavorites(movie);
  }

  goToPage(page: number): void {
    this.page = page;
    this.tmdbService.getMovies(page)
      .subscribe({
        next: (movies) => this.handleGetMovies(movies, page),
        error: console.error,
      });
  }

  private handleGetMovies(movies: ApiResponse<Movie>, page: number): void {
    this.movieResponse = movies;
    this.movies = this.movieResponse.results;
    this.totalPages = this.movieResponse.total_pages;
  }

  private handleFavoriteMoviesChanged(): void {
    this.favoriteService.favoritesChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (favoriteMovies) => {
        this.favoriteMovies = favoriteMovies;
        this.movies.map(movie => {
          movie.isFavorite = this.favoriteMovies.map(favorite => favorite.id).includes(movie.id) || false;
          return movie;
        });
      }});
  }
}
