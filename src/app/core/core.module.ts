import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { NewsBoxComponent } from './components/news-box-component/news-box.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';


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
  ],
  exports: [
    HeaderComponent,
    BodyComponent,
    NewsBoxComponent,
    NewsPageComponent,
  ],
  providers: [
    HeaderComponent,
    BodyComponent,
    NewsBoxComponent,
    NewsPageComponent
  ]
})
export class CoreModule { }
