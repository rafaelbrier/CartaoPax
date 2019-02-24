import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { fireBaseConfig } from './core/services/firebase-storage/config';
import { DashboardModule } from './dashboard/dashboard.module';
import { MainPageModule } from './main-page/mainpage.module';
import { Error404PageComponent } from './main-page/pages/error404-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_guard/jwt.interceptor';
import { ErrorInterceptor } from './_guard/error.interceptor';

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
    AppRoutingModule
  ],
  exports: [],  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
