import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/utils/modal/modal.component';
import { UsersService, userData } from 'src/app/core/services/users-service';
import { Router } from '@angular/router';
import { BRCurrencyPipe } from 'src/app/core/pipes/brcurrency.pipe';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  isBoxLoading: boolean = false;
  boxLoadingError: boolean = false;

  searchValue: string;
  limitValue: number = 10;
  limitOptions: number[] = [10, 20, 30, 40];
  pagNumberOfPages: number;
  showDesactivatedUsers: boolean = false;

  usersData: any;
  users: any;
  pages: number = 0;
  limit: number = 10;
  orderBy: string = "id";
  orderAscOrDesc: string = "desc";

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.loadUsers(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.showDesactivatedUsers);
  }

  sortBy(orderBy: string) {
    this.orderBy = orderBy;
    this.orderAscOrDesc = this.orderAscOrDesc === "asc" ? "desc" : "asc";
    this.loadUsers(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.showDesactivatedUsers);
  }

  deleteUser(user: userData) {
    this.modal.openModal("Deletar Usuário", `Tem certeza que deseja deletar o usuário de CPF: <b>${user.cpf}</b>?`, "normal", true)
      .then(() => {
        this.modal.loaderModal();

        this.usersService.delete(user.id)
          .subscribe(() => {
            this.modal.closeAll();
            this.modal.openModal("Usuário Deletado", `O usuário de CPF: <b>${user.cpf}, foi deletado com sucesso.`, "success");
            if (this.usersService.getUser() === user.cpf) {
              this.usersService.logout();
            }
            this.loadUsers(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.showDesactivatedUsers);
          }, () => {
            this.modal.closeAll();
            this.modal.openModal("Erro!", "Houve algum erro ao deletar o usuário. Por favor tente novamente mais tarde.", "fail");
          });

      }).catch(() => { return });
  }

  showData(user: userData) {
    this.modal.openModal(`Dados do Usuário #${user.id}`,
      `<div>
          <p class="text-center font-weight-bold">
            <a href="${user.imgProfile ? user.imgProfile : '../../../../assets/images/add-user-avatar.png'}" target="_blank">
              ${user.imgProfile ? "Imagem de Perfil" : "Sem Imagem de Perfil"}
            </a>
          </p>
          <p class="break-word">Nome: <b>${user.name}</b></p>
          <p class="break-word">CPF: <b>${user.cpf}</b></p>
          <p class="break-word">Sexo: <b>${user.sex === "M" ? "Masculino" : "Feminino"}</b></p>
          <p class="break-word">Data de Nascimento: <b>${user.birthDate}</b></p>
          <p class="break-word">Escolaridade: <b>${user.escolaridade}</b></p>
          <p class="break-word">Telefone: <b>${user.telephone}</b></p>
          <p class="break-word">Telefone Opcional: <b>${user.telephoneOp || 'Não informado'}</b></p>
          <p class="break-word">Email: <b>${user.email || 'Não informado'}</b></p>
          <p class="break-word">CEP: <b>${user.cep}</b></p>
          <p class="break-word">Estado: <b>${user.estado}</b></p>
          <p class="break-word">Cidade: <b>${user.cidade}</b></p>
          <p class="break-word">Bairro: <b>${user.bairro}</b></p>
          <p class="break-word">Endereço: <b>${user.endereco}</b></p>
          <p class="break-word">Número: <b>${user.numero}</b></p>
          <p class="break-word">Complemento: <b>${user.complemento}</b></p>
          <p class="break-word">Plano: <b>${user.planos.name}</b></p>
          <p class="break-word">Mensalidade: <b>${new BRCurrencyPipe().transform(user.planPrice)}</b></p>
          <p class="break-word">Tipo de Conta: <b>${user.roles.name}</b></p>
      </div>
      `)
  }

  editUser(user: userData) {
    this.router.navigate(['dashboard/usersadd'], { queryParams: { id: user.id } });
  }

  enableDisableUser(user: userData) {
    if(user) {
      this.usersService.activateOrDesactivate(user.id)
        .subscribe(() => {
          this.modal.openModal("Sucesso!", `Usuário de CPF: <b>${user.cpf} </b> foi 
          <b>${user.active ? 'DESABILITADO' : 'HABILITADO'}</b> com sucesso.`, "success");
          this.loadUsers(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.showDesactivatedUsers);
        }, () => {
          this.modal.openModal("Erro!", "Houve algum erro ao modificar o estado do usuário. Por favor tente novamente mais tarde.", "fail");
        })
    }
  }

  onSearchChange(searchValue: string) {
    this.searchValue = searchValue;
    this.loadUsers(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.showDesactivatedUsers);
  }

  onCheckChange(checkBox: boolean) {
    this.showDesactivatedUsers = checkBox;
    this.loadUsers(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.showDesactivatedUsers);
  }

  onSelectChange(limitValue: number) {
    this.limit = limitValue;
    this.loadUsers(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.showDesactivatedUsers);
  }

  onPageChange(page: number) {
    this.pages = page - 1;
    this.loadUsers(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.showDesactivatedUsers);
  }

  loadUsers(pages: number, limit: number, orderBy: string, orderAscOrDesc: string, searchTerm: string, showDesactivated: boolean) {

    this.isBoxLoading = true;
    this.boxLoadingError = false;

    this.usersService.findAllPageable(pages, limit, orderBy, orderAscOrDesc, searchTerm, showDesactivated)

      .subscribe((resData): any => {
        this.usersData = resData;
        this.users = this.usersData.content;
        delete this.usersData.content;
        this.pagNumberOfPages = 10 * Math.ceil(this.usersData.totalElements / this.limitValue);
        this.isBoxLoading = false;

        let totalElementsCount = this.users ? this.users.length : 0;
        this.users =
          this.users.filter(obj => this.usersService.havePermission(obj.roles.role) === true);
        let croppedElementsCount = totalElementsCount - this.users.length;

        if (this.users) {
          this.usersData.totalElements = this.usersData.totalElements - croppedElementsCount;
          this.usersData.numberOfElements = this.usersData.numberOfElements - croppedElementsCount;
        }

      }, () => {
        this.isBoxLoading = false;
        this.boxLoadingError = true;
      });
  }
}
