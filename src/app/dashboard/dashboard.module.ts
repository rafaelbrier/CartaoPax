import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { CoreModule } from '../core/core.module';
import { MainPageComponent } from './main-page/main-page.component';
import { NewsAddComponent } from './pages/news-add/news-add.component';
import { NewsCommentsComponent } from './pages/news-comments/news-comments.component';
import { NewsManagerComponent } from './pages/news-manager/news-manager.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
              ['clean'],  ]
            }
          }),
    ],
    declarations: [
        //Pages
        MainPageComponent,
        SidebarComponent,
        NewsAddComponent,
        NewsManagerComponent,
        NewsCommentsComponent
    ],
    exports: [],
    providers: [],
    entryComponents: [MainPageComponent],
})
export class DashboardModule { }