import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from '../core/core.module';
import { MainPageComponent } from './main-page/main-page.component';
import { NewsAddComponent } from './pages/news-add/news-add.component';
import { NewsCommentsComponent } from './pages/news-comments/news-comments.component';
import { NewsManagerComponent } from './pages/news-manager/news-manager.component';
import { UsersAddComponent } from './pages/users-add/users-add.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersManagerComponent } from './pages/users-manager/users-manager.component';
import { SobrePlanoComponent } from './pages/sobre-plano/sobre-plano.component';
import { DescricaoPagamentosComponent } from './pages/descricao-pagamentos/descricao-pagamentos.component';
import { BoletosComponent } from './pages/boletos/boletos.component';

@NgModule({
    imports: [
        CoreModule.forRoot(),        
        MatSidenavModule,
        MatToolbarModule,
        QuillModule.forRoot({
            modules: {
              toolbar: [ ['bold', 'italic', 'underline', 'strike'], 
              ['blockquote', 'code-block'],    
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }], 
              [{ 'direction': 'rtl' }],    
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],    
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],    
              ['clean'],
              ['link'] 
            ],}
          }),
    ],
    declarations: [
        //Pages
        MainPageComponent,
        SidebarComponent,
        NewsAddComponent,
        NewsManagerComponent,
        NewsCommentsComponent,
        UsersAddComponent,
        ProfileComponent,
        UsersManagerComponent,
        SobrePlanoComponent,
        DescricaoPagamentosComponent,
        BoletosComponent
    ],
    exports: [],
    providers: [],
    entryComponents: [MainPageComponent],
})
export class DashboardModule { }
