import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './body/body.component';
import { NewsBoxComponentComponent } from './components/news-box-component/news-box-component.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    BodyComponent,
    NewsBoxComponentComponent,
  ],
  exports: [
    HeaderComponent,
    BodyComponent,
    NewsBoxComponentComponent
  ],
  providers: [
    HeaderComponent,
    BodyComponent,
    NewsBoxComponentComponent
  ]
})
export class CoreModule { }
