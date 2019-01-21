import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { NewsBoxComponent } from './components/news-box-component/news-box.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { Error404PageComponent } from './pages/error404-page.component';
import { ErrorLoadComponent } from './components/error-load/error-load.component';
import { MainPageComponent } from './dashboard/main-page/main-page.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
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
  ],
  exports: [
    HeaderComponent,
  ],
  providers: []
})
export class CoreModule { }
