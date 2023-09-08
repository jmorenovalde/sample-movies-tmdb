import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input({required: true}) movie!: Movie;

  @Output() addToFavorite = new EventEmitter<Movie>();
  @Output() removeToFavorite = new EventEmitter<Movie>();

  onClickAddToFavorite(isFavorite: boolean): void {
    if (isFavorite) {
      this.addToFavorite.emit(this.movie);
    } else {
      this.removeToFavorite.emit(this.movie);
    }
  }
}
