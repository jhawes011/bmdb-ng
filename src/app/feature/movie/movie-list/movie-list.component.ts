import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie.service';
import { SystemService } from '../../../service/system.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit, OnDestroy {
  title: string = 'Movie-List';
  movies!: Movie[];
  subscription!: Subscription;
  welcomeMsg!: string;
  loggedInUser!: User;
  isAdmin: boolean = false;
  constructor(private movieSvc: MovieService, private sysSvc: SystemService) {}
  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.sysSvc.loggedInUser.firstName}!`;
    this.subscription = this.movieSvc.list().subscribe((resp) => {
      this.movies = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
