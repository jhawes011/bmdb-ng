import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-create',
  standalone: false,
  templateUrl: './actor-create.component.html',
  styleUrl: './actor-create.component.css',
})
export class ActorCreateComponent implements OnInit, OnDestroy {
  title: string = 'Actor-Create';
  newActor: Actor = new Actor();
  subscription!: Subscription;
  genders: string[] = ['M', 'F'];

  birthDate: string = '';

  validateBirthDate(): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(this.birthDate);
  }

  constructor(private actorSvc: ActorService, private router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addActor(): void {
    this.subscription = this.actorSvc.add(this.newActor).subscribe((resp) => {
      this.router.navigateByUrl('/actor-list');
    });
  }
}
