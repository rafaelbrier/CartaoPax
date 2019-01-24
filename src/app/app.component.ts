import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cartaopax-site';
  routerEventsSubscription: Subscription;
  routerUrl: string = "";

  constructor(private router: Router) {
    this.routerEventsSubscription =
      this.router.events.subscribe(() => {
        let indexOfBackslash = window.location.pathname.indexOf('/', 1);
        this.routerUrl = window.location.pathname.substring(0, indexOfBackslash > 0 ? indexOfBackslash : window.location.pathname.length);
      });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();    
  }
}
