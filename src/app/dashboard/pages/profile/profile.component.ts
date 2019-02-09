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

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.userRole = this.usersService.getRole();
    this.usersService.findUserByCpf(this.usersService.getUser())
    .subscribe( (res:any) =>
      {
        if(res.content) {
          this.user = res.content[0];
        }
      }, err => {console.log(err)}
      )
  }

}
