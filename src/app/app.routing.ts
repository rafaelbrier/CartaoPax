import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BodyComponent } from './main-page/body/body.component';
import { NewsPageComponent } from './main-page/pages/news-page/news-page.component';
import { Error404PageComponent } from './main-page/pages/error404-page.component';
import { MainPageComponent } from './dashboard/main-page/main-page.component';
import { NewsManagerComponent } from './dashboard/pages/news-manager/news-manager.component';
import { NewsAddComponent } from './dashboard/pages/news-add/news-add.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'home', component: BodyComponent,  data: { breadcrumb: "Home" } },
  { path: 'news', component: NewsPageComponent,  data: { breadcrumb: "Notícias" } },
  { path: 'news/:id', component: NewsPageComponent,  data: { breadcrumb: "Notícias" } },
  { 
    path: 'dashboard',
    component: MainPageComponent,
    children: [
      { path: 'newsadd', component: NewsAddComponent,  data: { breadcrumb: "Adicionar Notícia" } },
      { path: 'newsmanager', component: NewsManagerComponent,  data: { breadcrumb: "Gerenciar Notícias" } },
      ]
  },
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' }
  //   
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);