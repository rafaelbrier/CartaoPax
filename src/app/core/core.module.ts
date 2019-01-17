import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { NewsBoxComponent } from './components/news-box-component/news-box.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';


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
  ],
  exports: [
    HeaderComponent,
    BodyComponent,
    NewsBoxComponent
  ],
  providers: [
    HeaderComponent,
    BodyComponent,
    NewsBoxComponent
  ]
})
export class CoreModule { }
