import { NgModule } from '@angular/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { CoreModule } from '../core/core.module';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { PlanosComponent } from './pages/planos/planos.component';

@NgModule({
    imports: [
        CoreModule.forRoot(),
        NgxGalleryModule,
    ],
    declarations: [
        BodyComponent,
        HeaderComponent,
        NewsPageComponent,
        PlanosComponent,
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [],
    entryComponents: [BodyComponent],
})
export class MainPageModule { }
