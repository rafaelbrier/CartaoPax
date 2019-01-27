import { NgModule } from '@angular/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { CoreModule } from '../core/core.module';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';

@NgModule({
    imports: [
        CoreModule.forRoot(),
        NgxGalleryModule,
    ],
    declarations: [
        BodyComponent,
        HeaderComponent,
        NewsPageComponent,
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [],
    entryComponents: [BodyComponent],
})
export class MainPageModule { }
