import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title: string = 'UserLogin';
  userLogin: UserLogin = new UserLogin();
  subscription!: Subscription;
  user!: User;
  message: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private sysSvc: SystemService
  ) {}
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  login() {
    this.subscription = this.userService.login(this.userLogin).subscribe({
      next: (resp) => {
        this.sysSvc.loggedInUser = resp;
        this.router.navigateByUrl('/movie-list');
      },
      error: (err) => {
        this.message = 'Invalid login credentials';
      },
    });
  }
}
