import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CoreModule } from './core/core.module';
import * as firebase from 'firebase/app';
import { fireBaseConfig } from './core/services/firebase-storage/config';

firebase.initializeApp(fireBaseConfig);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,  
    CoreModule,
    RouterModule,
    routing,
    // NgBootstrap
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
