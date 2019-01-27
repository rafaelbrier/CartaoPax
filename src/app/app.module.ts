import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import * as firebase from 'firebase/app';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { fireBaseConfig } from './core/services/firebase-storage/config';
import { DashboardModule } from './dashboard/dashboard.module';
import { MainPageModule } from './main-page/mainpage.module';
import { Error404PageComponent } from './main-page/pages/error404-page.component';

firebase.initializeApp(fireBaseConfig);

@NgModule({
  declarations: [
    AppComponent,   
    Error404PageComponent,
  ],
  imports: [
    BrowserModule,  
    DashboardModule,
    MainPageModule,
    CoreModule.forRoot(),
    RouterModule,
    AppRoutingModule
  ],
  exports: [],  
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
