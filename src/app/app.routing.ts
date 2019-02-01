import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { BodyComponent } from './main-page/body/body.component';
import { NewsPageComponent } from './main-page/pages/news-page/news-page.component';
import { Error404PageComponent } from './main-page/pages/error404-page.component';
import { MainPageComponent } from './dashboard/main-page/main-page.component';
import { NewsManagerComponent } from './dashboard/pages/news-manager/news-manager.component';
import { NewsAddComponent } from './dashboard/pages/news-add/news-add.component';
import { UsersAddComponent } from './dashboard/pages/users-add/users-add.component';
import { AuthGuard } from './_guard/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BodyComponent, data: { breadcrumb: "Home" } },
  { path: 'news', component: NewsPageComponent, data: { breadcrumb: "Notícias" } },
  { path: 'news/:id', component: NewsPageComponent, data: { breadcrumb: "Notícias" } },
  {
    path: 'dashboard',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'newsadd',
        component: NewsAddComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: "Adicionar Notícia",
          expectedRole: 'EMPLOYEE'
        }
      },
      {
        path: 'newsmanager',
        component: NewsManagerComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: "Gerenciar Notícias",
          expectedRole: 'EMPLOYEE'
        }
      },
      {
        path: 'usersadd',
        component: UsersAddComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: "Adicionar Usuário",
          expectedRole: 'EMPLOYEE'
        }
      },
    ]
  },
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' }
  //   
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);