import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  title: string = 'Movie-Detail';
  movieId!: number;
  movie!: Movie;
  subscription!: Subscription;

  constructor(
    private movieSvc: MovieService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get movieId from the URL
    this.actRoute.params.subscribe((params) => {
      this.movieId = params['id'];
      // get movie from the service
      this.subscription = this.movieSvc.getById(this.movieId).subscribe({
        next: (resp) => {
          this.movie = resp;
        },
        error: (err) => {
          console.error('Error retrieving movie: ', err);
        },
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete() {
    this.movieSvc.delete(this.movieId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/movie-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
