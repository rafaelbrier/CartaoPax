import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './body/body.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { ErrorLoadComponent } from './components/error-load/error-load.component';
import { NewsBoxComponent } from './components/news-box-component/news-box.component';
import { MainPageComponent } from './dashboard/main-page/main-page.component';
import { NewsManagerComponent } from './dashboard/pages/news-manager/news-manager.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { Error404PageComponent } from './pages/error404-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ValidatorsComponent } from './components/validators/validators.component';
import { ModalComponent } from './components/modal/modal.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
    NgbModalModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    BodyComponent,
    NewsBoxComponent,
    NewsPageComponent,
    CommentBoxComponent,
    Error404PageComponent,
    ErrorLoadComponent,
    MainPageComponent,
    SidebarComponent,
    NewsManagerComponent,
    ValidatorsComponent,
    ModalComponent
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [NgbActiveModal], 
  entryComponents: [ModalComponent],
})
export class CoreModule { }
