import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/utils/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { whiteSpace } from 'src/app/core/components/utils/validators/custom-validators';
import { SharedService } from 'src/app/core/services/shared-services';
import { UsersService } from 'src/app/core/services/users-service';
import { RolesService } from 'src/app/core/services/roles-service';
import { PlanosService } from 'src/app/core/services/planos-service';
import { FireStorageService } from 'src/app/core/services/firebase-storage/fire-storage.service';

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

  role: string;
  roleOptions: any[] = [];

  plano: string;
  planosOptions: any[] = [];

  escolaridade: string;
  escolaridadeOptions: ["FUNDAMENTAL INCOMPLETO","FUNDAMENTAL COMPLETO", "MÉDIO INCOMPLETO",
  "MÉDIO COMPLETO","SUPERIOR INCOMPLETO", "SUPERIOR COMPLETO","PÓS (LATO-SENSO) INCOMPLETO",
  "PÓS (LATO-SENSO) COMPLETO","MESTRADO INCOMPLETO","MESTRADO COMPLETO",
  "DOUTORADO INCOMPLETO","DOUTORADO COMPLETO"];

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
    private planosService: PlanosService,
    private fireStorageService: FireStorageService) { }

  ngOnInit() {
    this.usersAddFormBuilder();

    this.populateRoles();
    this.populatePlanos();

    this.usersAddForm.controls['cep'].valueChanges.subscribe((cep) => {
         this.consultaCep(cep);
    });
    
  }

  usersAddFormBuilder(): void {
    this.usersAddForm = this.formBuilder.group({
      name: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      cpf: ['', [Validators.required, whiteSpace, Validators.maxLength(14), Validators.minLength(14)]],
      sex: ['', [Validators.required, whiteSpace], Validators.maxLength(2)],
      telephone: ['', [Validators.required, whiteSpace, Validators.maxLength(15)]],
      telephoneOp: ['', Validators.maxLength(15)],
      email: ['', [Validators.maxLength(100)]],
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

  get v() { return this.usersAddForm.value; }

  submitUserForm(): void {
    this.sharedService.triggerValidation(this.usersAddForm);
    console.log(this.usersAddForm.value)
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
          this.planosOptions.push({ value: value, info: info });
        })
      }, () => { this.errorOnRetrieve() })
  }

  retrieveImg(): Promise<any> {
    this.inProgress = true;
    let uploadTask = this.fireStorageService.uploadImage(this.profileImg, 'profile-images');

    uploadTask.uploadObs((snapshot: { bytesTransferred: number; totalBytes: number; }) => {
      this.progressImg = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.progressImg = Math.round(this.progressImg);
    }, (err: string) => {
      this.modal.openModal("Erro!", "Houve algum erro ao processar a imagem. Por favor tente novamente.\n" + err, "fail");
      this.uploadError = true;
    });

    return uploadTask.uploadTask.then(() => {
      return uploadTask.uploadTask.snapshot.ref.getDownloadURL()
        .then(url => {
          return url;
        });
    });
  }

  consultaCep(Cep: string) {
    let addr: any;
    
    if(Cep.length === 9) {
      this.disableAddrFields();

      this.sharedService.consultaCEP(Cep)
      .subscribe(res => {
       addr = res;
       this.usersAddForm.patchValue({
         endereco: addr.logradouro,
         bairro: addr.bairro,
         estado: addr.uf,
         cidade: addr.localidade
       });
       this.enableAddrFields();
      }, () =>{ this.enableAddrFields(); });
    }
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

  disableAddrFields() {
    this.f.endereco.disable();
    this.f.bairro.disable();
    this.f.estado.disable();
    this.f.cidade.disable();
  }
  enableAddrFields() {
    this.f.endereco.enable();
    this.f.bairro.enable();
    this.f.estado.enable();
    this.f.cidade.enable();
  }
}
