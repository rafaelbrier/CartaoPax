import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';

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
