import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './shared/components/movies/movies.component';
import { MovieCardComponent } from './shared/components/movies/movie-card/movie-card.component';
import { RatingComponent } from './shared/components/rating/rating.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { RatingPipe } from './shared/components/rating/rating.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieCardComponent,
    RatingComponent,
    PaginatorComponent,
    RatingPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
