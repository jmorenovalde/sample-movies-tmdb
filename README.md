# sample-movies-tmdb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

This project is a sample project for learning unit testing on Angular. This project only has a page that gets the films from [The Movie Database](https://www.themoviedb.org/) (the Trending movies) and shows a simple grid.

For the styles, I used [Bootstrap](https://getbootstrap.com). It is not the best but it is easy and fast to implement.

On the `main` branch, you can see the project without tests, and you can watch the branches with the different techniques to test the application (`Jasmine`, `Jest`, `Testing Library`).

On the `main` branch, we have the **Jasmine** configuration to does not show the navigator and set the coverage configuration.

## Requirements

Before installing and running the application, you need to get a credential from [The Movie Database](https://www.themoviedb.org/). After the credentials are created, you need to generate API credentials. With the API credentials, we need to create the file `env.variables.ts`, for that, we have a sample on the file `env.variables.ts.sample`. Write your values over there.

When our environment file is finished, we can install and run the application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
