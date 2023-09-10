import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ACCOUNT_ID, API_KEY, AUTHORIZATION } from '../../../config';

import { ApiActionResponse, ApiResponse, Movie } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseAPIUrl = 'https://api.themoviedb.org/3';

  constructor(private readonly http: HttpClient) { }

  getMovies(page = 1): Observable<ApiResponse<Movie>> {
    return this.http.get<ApiResponse<Movie>>(`${this.baseAPIUrl}/trending/movie/day?api_key=${API_KEY}&page=${page}`);
  }

  getFavorites(page = 1): Observable<ApiResponse<Movie>> {
    const headers = this.generateHeaders();
    return this.http.get<ApiResponse<Movie>>(
      `${this.baseAPIUrl}/account/${ACCOUNT_ID}/favorite/movies?api_key=${API_KEY}&page=${page}`,
      { headers }
    );
  }

  addFavorite(movieId: number): Observable<ApiActionResponse> {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    }
    const headers = this.generateHeaders();
    return this.http.post<ApiActionResponse>(
      `${this.baseAPIUrl}/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}`,
      body,
      { headers }
    );
  }

  removeFavorite(movieId: number): Observable<ApiActionResponse> {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: false,
    }
    const headers = this.generateHeaders();
    return this.http.post<ApiActionResponse>(
      `${this.baseAPIUrl}/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}`,
      body,
      { headers }
    );
  }

  private generateHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${AUTHORIZATION}`);

  }
}
