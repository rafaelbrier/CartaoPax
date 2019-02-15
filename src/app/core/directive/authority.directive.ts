import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { UsersService } from '../services/users-service';

@Directive({
  selector: '[hasAuthority]'
})
export class AuthorityDirective {
  //  The element needs and Id equals 
  // to the Sort Element in the database and equals to orderBy

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private usersService: UsersService
    ) {
  }

  @Input()
  set hasAuthority(authority: string) {
    if(this.usersService.havePermission(authority)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }


}
