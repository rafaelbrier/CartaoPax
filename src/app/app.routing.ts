import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BodyComponent } from './core/body/body.component';
import { NewsPageComponent } from './core/pages/news-page/news-page.component';
import { Error404PageComponent } from './core/pages/error404-page.component';
import { MainPageComponent } from './core/dashboard/main-page/main-page.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'home', component: BodyComponent },
  { path: 'news', component: NewsPageComponent },
  { path: 'news/:id', component: NewsPageComponent },
  { path: 'dashboard', component: MainPageComponent},
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' }
    // children: [
    //   { path: 'news', component: NewsPageComponent },
    //   { path: 'news/:id', component: NewsPageComponent },
    // ]
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);