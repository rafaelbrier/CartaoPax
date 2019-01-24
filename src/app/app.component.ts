import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FireStorageService } from './core/services/firebase-storage/fire-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cartaopax-site';
  routerEventsSubscription: Subscription;
  routerUrl: string = "";

  constructor(private router: Router, private fireStorageService: FireStorageService) {
    this.routerEventsSubscription =
      this.router.events.subscribe(() => {
        let indexOfBackslash = window.location.pathname.indexOf('/', 1);
        this.routerUrl = window.location.pathname.substring(0, indexOfBackslash > 0 ? indexOfBackslash : window.location.pathname.length);
      });

      this.fireStorageService.checkLoginBeforeContinue();
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();    
  }
}
