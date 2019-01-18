import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BodyComponent } from './core/body/body.component';
import { NewsPageComponent } from './core/pages/news-page/news-page.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'home', component: BodyComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'news/:id', component: NewsPageComponent },
    // children: [
    //   { path: 'news', component: NewsPageComponent },
    //   { path: 'news/:id', component: NewsPageComponent },
    // ]
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);