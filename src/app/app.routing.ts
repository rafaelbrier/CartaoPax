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
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { PlanosComponent } from './main-page/pages/planos/planos.component';
import { UsersManagerComponent } from './dashboard/pages/users-manager/users-manager.component';
import { SobrePlanoComponent } from './dashboard/pages/sobre-plano/sobre-plano.component';
import { BoletosComponent } from './dashboard/pages/boletos/boletos.component';
import { DescricaoPagamentosComponent } from './dashboard/pages/descricao-pagamentos/descricao-pagamentos.component';
import { ObituarioComponent } from './main-page/pages/obituario/obituario.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BodyComponent, data: { breadcrumb: "Home" } },
  // { path: 'news', component: NewsPageComponent, data: { breadcrumb: "Notícias" } },
  { path: 'news/:id', component: NewsPageComponent, data: { breadcrumb: "Notícias" } },
  { path: 'obituario', component: ObituarioComponent, data: { breadcrumb: "Obituário" } },
  { path: 'obituario/:id', component: ObituarioComponent, data: { breadcrumb: "Obituário" } },
  { path: 'planos', component: PlanosComponent, data: { breadcrumb: "Planos" } },
  {
    path: 'dashboard',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'CLIENT' //Mínima Role que pode visualizar
        }
      },
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
      {
        path: 'usersmanager',
        component: UsersManagerComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: "Gerenciar Usuários",
          expectedRole: 'EMPLOYEE'
        }
      },
      {
        path: 'sobreplano',
        component: SobrePlanoComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: "Sobre o Plano",
          expectedRole: 'CLIENT'
        }
      },
      {
        path: 'boletos',
        component: BoletosComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: "Boletos",
          expectedRole: 'CLIENT'
        }
      },
      {
        path: 'descricaopagamentos',
        component: DescricaoPagamentosComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: "Descrição de Pagamentos",
          expectedRole: 'CLIENT'
        }
      },
      
    ]
  },
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' }
  //   
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 0]
  });