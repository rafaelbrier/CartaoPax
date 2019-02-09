import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { NewsBoxComponent } from './components/news-box-component/news-box.component';
import { BreadcrumbComponent } from './components/utils/breadcrumb/breadcrumb.component';
import { ErrorLoadComponent } from './components/utils/error-load/error-load.component';
import { ImgLazyComponent } from './components/utils/img-lazy/img-lazy.component';
import { ModalComponent } from './components/utils/modal/modal.component';
import { ValidatorsComponent } from './components/utils/validators/validators.component';
import { SortTableDirective } from './directive/sort-table.directive';
import { TokenService } from './services/token-service';
import { BrPhoneFormatPipe } from './pipes/br-phone.pipe';
import { ImgInputFileComponent } from './components/img-input-file/img-input-file.component';
import { CepPipe } from './pipes/cep.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { MyDatePipe } from './pipes/date.pipe';
import { BRCurrencyPipe } from './pipes/brcurrency.pipe';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    NgbModalModule,
  ],

  declarations: [
    NewsBoxComponent,
    CommentBoxComponent,
    BreadcrumbComponent,
    ErrorLoadComponent,
    ImgLazyComponent,
    ModalComponent,
    ValidatorsComponent,
    SortTableDirective,
     //Pipe
     BrPhoneFormatPipe,
     ImgInputFileComponent,
     CepPipe,
     CpfPipe,
     MyDatePipe,
     BRCurrencyPipe,
  ],

  exports: [
    //Exported Components
    NewsBoxComponent,
    CommentBoxComponent,
    BreadcrumbComponent,
    ErrorLoadComponent,
    ImgLazyComponent,
    ModalComponent,
    ValidatorsComponent,
    ImgInputFileComponent,

    //Exported Directives
    SortTableDirective,

    //Exporter Pipes
    BrPhoneFormatPipe,
    CepPipe,
    CpfPipe,
    MyDatePipe,
    BRCurrencyPipe,

    //Exported Modules
    NgbModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    NgbModalModule
  ],

  providers: [NgbActiveModal, TokenService],
  entryComponents: [ModalComponent],
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [NgbActiveModal]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    }
  }
}
