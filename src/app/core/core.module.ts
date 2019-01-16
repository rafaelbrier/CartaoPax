import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './body/body.component';

@NgModule({
  imports: [
    NgbModule
  ],
  declarations: [    
    HeaderComponent,
     BodyComponent
  ],
  exports: [    
    HeaderComponent,
     BodyComponent
  ],
  providers: [    
    HeaderComponent,
    BodyComponent
  ]
})
export class CoreModule { }
