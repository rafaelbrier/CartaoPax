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
  downloadURL: string = undefined;
  uploadedFileName: string = undefined;

  sex: string;
  sexOptions: any[] = [{ value: "M", info: "Masculino" }, { value: "F", info: "Feminino" }]; //ISO/IEC 5218

  role: string;
  roleOptions: any[] = [];

  plano: string;
  planosOptions: any[] = [];

  escolaridade: string;
  escolaridadeOptions: string[] = ["FUNDAMENTAL INCOMPLETO", "FUNDAMENTAL COMPLETO", "MÉDIO INCOMPLETO",
    "MÉDIO COMPLETO", "SUPERIOR INCOMPLETO", "SUPERIOR COMPLETO", "PÓS (LATO-SENSO) INCOMPLETO",
    "PÓS (LATO-SENSO) COMPLETO", "MESTRADO INCOMPLETO", "MESTRADO COMPLETO",
    "DOUTORADO INCOMPLETO", "DOUTORADO COMPLETO"];

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
    this.usersAddForm.controls['birthDate'].valueChanges.subscribe((birthDate) => {
      this.consultaPrecoPlano(birthDate, this.v.plano);
    });
    this.usersAddForm.controls['plano'].valueChanges.subscribe((plano) => {
      this.consultaPrecoPlano(this.v.birthDate, plano);
    });

  }

  usersAddFormBuilder(): void {
    this.usersAddForm = this.formBuilder.group({
      name: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      cpf: ['', [Validators.required, whiteSpace, Validators.maxLength(14), Validators.minLength(14)]],
      sex: ['', [Validators.required, whiteSpace, Validators.maxLength(2)]],
      telephone: ['', [Validators.required, whiteSpace, Validators.maxLength(15), Validators.minLength(14)]],
      telephoneOp: ['', [Validators.maxLength(15), Validators.minLength(14)]],
      email: ['', [Validators.maxLength(100)]],
      birthDate: ['', [Validators.required, whiteSpace, Validators.maxLength(10)]],
      cep: ['', [Validators.required, whiteSpace, Validators.maxLength(9), Validators.minLength(9)]],
      endereco: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      numero: ['', [Validators.required, whiteSpace, Validators.maxLength(6)]],
      complemento: ['', [Validators.maxLength(15)]],
      escolaridade: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      bairro: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      estado: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      cidade: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      role: ['', [Validators.required, whiteSpace, Validators.maxLength(20)]],
      plano: ['', [Validators.required, whiteSpace, Validators.maxLength(50)]],
      precomensalidade: [0.00, [Validators.required, whiteSpace, Validators.maxLength(10)]]
    });
    this.usersAddForm.controls['role'].setValue(this.role, { onlySelf: true });
  }

  get f() { return this.usersAddForm.controls; }

  get v() { return this.usersAddForm.value; }

  submitUserForm(): void {
    this.sharedService.triggerValidation(this.usersAddForm);
    if (this.usersAddForm.invalid) {
      return;
    }

    this.submitting = true;
    this.modal.openModal("Cadastrar Usuário",
      `Tem certeza que deseja cadastrar o usuário de <b>CPF: ${this.usersAddForm.value.cpf}</b>?`, "normal", true)
      .then(() => {
        if (this.profileImg) {
          this.retrieveImg()
            .then((url) => {

              this.downloadURL = url;
              this.sendUser();

            }).catch(() => { this.submitting = false; return });
        } else {
          this.uploadedFileName = null;
          this.sendUser();
        }
      }).catch(() => { this.submitting = false; return });
  }

  sendUser() {
    const values = this.usersAddForm.value;
    const signUpData = {
      name: values.name,
      cpf: values.cpf,
      imgProfile: this.downloadURL,
      telephone: values.telephone,
      telephoneOp: values.telephoneOp,
      email: values.email,
      escolaridade: values.escolaridade,
      cep: values.cep,
      endereco: values.endereco,
      numero: values.numero,
      bairro: values.bairro,
      estado: values.estado,
      cidade: values.cidade,
      complemento: values.complemento,
      sex: values.sex,
      birthDate: values.birthDate,
      roles: { id: values.role },
      planos: { id: values.plano },
      planPrice: values.precomensalidade
    }

    this.usersService.signUp(signUpData)
      .subscribe(() => {
        this.modal.openModal("Usuário Cadastrado com Sucesso!",
          `O usuário de <b>CPF: ${this.usersAddForm.value.cpf}</b> foi cadastrado com sucesso!`
          , "success");

      }, (err) => {
        this.submitting = false;
        this.handleErrorResponse(err);
      })
  }

  handleErrorResponse(err: any) {
    if (this.uploadedFileName) {
      this.fireStorageService.deleteImg(this.uploadedFileName, 'profiles-images');
    }
    if (err.error) {
      if (err.error.errors) {
        if (err.error.errors.length >= 1) {
          let errorsArr = err.error.errors;
          let messagesArr = [];
          errorsArr.forEach(element => {
            messagesArr.push('<div>- ' + element["defaultMessage"]+'</div>');
          });
          let errorMessages = `<div class="alert alert-danger text-left col-sm-11 mx-auto">
          ${messagesArr.join('')}</div>`;
          this.modal.openModal("Erro!", errorMessages, "fail");
          return;
        }
      }
    }
    this.modal.openModal("Erro!", "Houve algum erro ao cadastrar o usuário. Por favor tente novamente mais tarde.", "fail");
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

      }, () => { });
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
    let uploadTask = this.fireStorageService.uploadImage(this.profileImg, 'profiles-images');
    this.uploadedFileName = uploadTask.fileName;

    uploadTask.uploadObs((snapshot: { bytesTransferred: number; totalBytes: number; }) => {
      this.progressImg = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.progressImg = Math.round(this.progressImg);
    }, (err: string) => {
      this.uploadedFileName = null;
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

  consultaPrecoPlano(birthDate: string, planoId: number) {
    this.planosService.getPlanPrice(birthDate, planoId)
      .subscribe(res => {
        if (res)
          this.usersAddForm.patchValue({ precomensalidade: res })
      });
  }

  consultaCep(Cep: string) {
    let addr: any;

    if (Cep.length === 9) {
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
        }, () => { this.enableAddrFields(); });
    }
  }

  fileImg(imgFile: File) {
    this.profileImg = imgFile;
  }

  errorOnRetrieve() {
    if (!this.modal.hasOpenModals())
      this.modal.openModal("Erro!",
        `Não foi possível recuperar os dados do servidor, favor tentar novamente mais tarde.`
        , "fail");
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
