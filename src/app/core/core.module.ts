import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbModule
  ],
  declarations: [    
    HeaderComponent
  ],
  exports: [    
    HeaderComponent
  ],
  providers: [    
    HeaderComponent
  ]
})
export class CoreModule { }
