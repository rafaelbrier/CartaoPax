import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/utils/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { whiteSpace } from 'src/app/core/components/utils/validators/custom-validators';
import { SharedService } from 'src/app/core/services/shared-services';
import { UsersService } from 'src/app/core/services/users-service';
import { RolesService } from 'src/app/core/services/roles-service';
import { PlanosService } from 'src/app/core/services/planos-service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  profileImg: File;
  progressImg: number;
  inProgress: boolean = false;
  uploadError: boolean = false;
  downloadURL: String = undefined;

  sex: string;
  sexOptions: any[] = [{ value: "M", info: "Masculino" }, { value: "F", info: "Feminino" }]; //ISO/IEC 5218

  role: string = "CLIENT";
  roleOptions: any[] = [];

  plano: string;
  planosOption: any[] = [];

  escolaridade: string;
  escolaridadeOptions: [{value: "FUNDAMENTAL INCOMPLETO"},{value: "FUNDAMENTAL COMPLETO"}, {value: "MÉDIO INCOMPLETO"},
  {value: "MÉDIO COMPLETO"},{value: "SUPERIOR INCOMPLETO"},{value: "SUPERIOR COMPLETO"},{value: "PÓS (LATO-SENSO) INCOMPLETO"},
  {value: "PÓS (LATO-SENSO) COMPLETO"},{value: "MESTRADO INCOMPLETO"},{value: "MESTRADO COMPLETO"},
  {value: "DOUTORADO INCOMPLETO"},{value: "DOUTORADO COMPLETO"}];

  // Form
  usersAddForm: FormGroup;
  submitting: boolean = false;

  //Edit
  isEditing: boolean = false;
  usersToEdit: any;

  constructor(private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private planosService: PlanosService) { }

  ngOnInit() {
    this.usersAddFormBuilder();

    this.populateRoles();
    this.populatePlanos();
  }

  usersAddFormBuilder(): void {
    this.usersAddForm = this.formBuilder.group({
      name: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      cpf: ['', [Validators.required, whiteSpace, Validators.maxLength(400)]],
      sex: ['', [Validators.required, whiteSpace], Validators.maxLength(2)],
      telephone: ['', [Validators.required, whiteSpace, Validators.maxLength(16)]],
      telephoneOp: ['', [Validators.maxLength(16)]],
      email: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      birthDate: ['', [Validators.required, whiteSpace, Validators.maxLength(10)]],
      cep: ['', [Validators.required, whiteSpace, Validators.maxLength(9)]],
      endereco: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      numero: ['', [Validators.required, whiteSpace, Validators.maxLength(6)]],
      complemento: ['', [Validators.required, whiteSpace], Validators.maxLength(15)],
      escolaridade: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      bairro: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      estado: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      cidade: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      role: ['', [Validators.required, whiteSpace, Validators.maxLength(20)]],
      plano: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
    });
    this.usersAddForm.controls['role'].setValue(this.role, { onlySelf: true });
  }

  get f() { return this.usersAddForm.controls; }

  submitUserForm(): void {
    this.sharedService.triggerValidation(this.usersAddForm);
    if (this.usersAddForm.invalid) {
      return;
    }

    const values = this.usersAddForm.value;
    const signUpData = {
      name: values.name,
      cpf: values.cpf,
      sex: values.sex,
      birthDate: values.birthDate,
      role: values.role
    }

    this.usersService.signUp(signUpData);
  }

  populateRoles() {
    this.rolesService.findAll()
      .subscribe(res => {
        Object.keys(res).map((keys) => {
          let value = res[keys]["id"];
          let info = res[keys]["name"];
          this.roleOptions.push({ value: value, info: info });
        })
        this.roleOptions =
        this.roleOptions.filter(obj => this.usersService.havePermission(obj.info) === true);

      }, () => {});
  }

  populatePlanos() {
    this.planosService.findAll()
      .subscribe(res => {
        Object.keys(res).map((keys) => {
          let value = res[keys]["id"];
          let info = res[keys]["name"];
          this.planosOption.push({ value: value, info: info });
        })
      }, () => { this.errorOnRetrieve() })
  }

  test(imgFile: File) {
    this.profileImg = imgFile;
    console.log(this.profileImg)
  }

  errorOnRetrieve() {
    // if(!this.modal.hasOpenModals())
    // this.modal.openModal("Erro!",
    //   `Não foi possível recuperar os dados do servidor, favor tentar novamente mais tarde.`
    //   , "fail");
  }
}
