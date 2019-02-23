import { Component, OnInit } from '@angular/core';
import { UsersService, userData } from 'src/app/core/services/users-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userRole: string;
  isActive: boolean = true;
  user: userData;

  isEditting: boolean = false;

  constructor(private usersService: UsersService) { }

  isBoxLoading: boolean = false;
  boxLoadingError: boolean = false;

  ngOnInit() {
    this.isBoxLoading = true;
    this.boxLoadingError = false;

    this.userRole = this.usersService.getRole();
    this.usersService.findUserById(this.usersService.getId())
    .subscribe( (res:any) =>
      {
        if(res) {
          this.user = res;
        }
        this.isBoxLoading = false;
      }, () => { this.errorOnRetrieve(); }
      )
  }

  errorOnRetrieve() {
    this.boxLoadingError = true;
    this.isBoxLoading = false;
     }

}
