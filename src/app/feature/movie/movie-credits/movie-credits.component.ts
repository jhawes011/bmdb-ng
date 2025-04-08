import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-credits',
  standalone: false,
  templateUrl: './movie-credits.component.html',
  styleUrl: './movie-credits.component.css',
})
export class MovieCreditsComponent implements OnInit, OnDestroy {
  title: string = 'Movie-Credits';
  movieId!: number;
  credits!: any[]; // Replace with the appropriate type for credits

  constructor() {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // Logic to fetch movie credits based on movieId
    // this.credits = this.movieSvc.getCreditsByMovieId(this.movieId);
  }
}
