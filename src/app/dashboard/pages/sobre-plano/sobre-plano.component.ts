import { Component, OnInit } from '@angular/core';
import { UsersService, userData } from 'src/app/core/services/users-service';

@Component({
  selector: 'app-sobre-plano',
  templateUrl: './sobre-plano.component.html',
  styleUrls: ['./sobre-plano.component.scss']
})
export class SobrePlanoComponent implements OnInit {

  userPlano: {id?: number, name?: string, descricao?: string};

  boxLoadingError: boolean = false;
  isBoxLoading: boolean = false;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.isBoxLoading = true;
    this.boxLoadingError = false;

    this.usersService.findUserById(this.usersService.currentUserValue.id)
    .subscribe( (res: userData) => {
     if(res && res.planos) {
         this.userPlano = res.planos;
         this.isBoxLoading = false;
         this.boxLoadingError = false;
     } else {
      this.isBoxLoading = false;
      this.boxLoadingError = true;
     }
    })
  }

}
