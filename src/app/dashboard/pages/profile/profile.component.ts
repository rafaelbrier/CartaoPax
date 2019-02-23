import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/utils/modal/modal.component';
import { SharedService } from 'src/app/core/services/shared-services';
import { userData, UsersService } from 'src/app/core/services/users-service';
import { FireStorageService } from 'src/app/core/services/firebase-storage/fire-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  profileImg: File;
  progressImg: number;
  inProgress: boolean = false;
  uploadError: boolean = false;
  downloadURL: string = undefined;
  uploadedFileName: string = undefined;

  editImage: boolean = false;

  userRole: string;
  isActive: boolean = true;
  user: userData;

  submitting: boolean = false;
  retrievingCep: boolean = false;

  constructor(private usersService: UsersService,
    private sharedService: SharedService,
    private fireStorageService: FireStorageService) { }

  isBoxLoading: boolean = false;
  boxLoadingError: boolean = false;

  ngOnInit() {
    this.isBoxLoading = true;
    this.boxLoadingError = false;

    this.userRole = this.usersService.getRole();

    this.retrieveUser();
  }

  retrieveUser() {
    this.usersService.findUserById(this.usersService.getId())
      .subscribe((res: any) => {
        if (res) {
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

  consultaCep(Cep: string) {
    let addr: any;
    this.user.cep = Cep;
    if (Cep) {
      if (Cep.length === 9) {
        this.retrievingCep = true;

        this.sharedService.consultaCEP(Cep)
          .subscribe(res => {
            addr = res;
            this.user = {
              ...this.user,
              endereco: addr.logradouro,
              bairro: addr.bairro,
              estado: addr.uf,
              cidade: addr.localidade
            };

            this.retrievingCep = false;
          }, () => {
            this.retrievingCep = false;
          });
      }
    }
  }

  fileImg(imgFile: File) {
    if (!imgFile) this.downloadURL = null;
    this.profileImg = imgFile;
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

  submitForm() {
    this.submitting = true;
    this.modal.openModal(`Editar Dados`,
      `Tem certeza que deseja editar seus dados?`, "normal", true)
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
    this.user = {
      id: this.user.id,
      active: this.user.active,
      age: this.user.age,
      name: this.user.name,
      bairro: this.user.bairro,
      birthDate: this.user.birthDate,
      cep: this.user.cep,
      cidade: this.user.cidade,
      complemento: this.user.complemento,
      cpf: this.user.cpf,
      email: this.user.email,
      endereco: this.user.endereco,
      escolaridade: this.user.escolaridade,
      estado: this.user.estado,
      numero: this.user.numero,
      planPrice: this.user.planPrice,
      sex: this.user.sex,
      telephone: this.user.telephone,
      telephoneOp: this.user.telephoneOp,
      imgProfile: this.downloadURL,
      roles: this.user.roles,
      planos: this.user.planos
    };

    this.modal.loaderModal();

    this.usersService.userEdit(this.user)
      .subscribe(() => {
        this.submitComplete();
        this.modal.closeAll();
        this.modal.openModal(`Sucesso!`,
          `Informações editadas com sucesso!`
          , "success");
        this.retrieveUser();

      }, (err) => {
        console.log(err)
        this.submitting = false;
        this.modal.closeAll();
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
            messagesArr.push('<div>- ' + element["defaultMessage"] + '</div>');
          });
          let errorMessages = `<div class="alert alert-danger text-left col-sm-11 mx-auto">
          ${messagesArr.join('')}</div>`;
          this.modal.openModal("Erro!", errorMessages, "fail");
          return;
        }
      } else {
        this.modal.openModal("Erro!", `<div class="alert alert-danger text-left col-sm-11 mx-auto">${err.error.message}</div>`, "fail");
      }
    } else {
      this.modal.openModal("Erro!", `Houve algum erro ao editar os dados. Por favor tente novamente mais tarde.`, "fail");
    }
  }

  submitComplete() {
    this.inProgress = false;
    this.submitting = false;
    this.editImage = false;
    this.removeMainImg();
  }

  removeMainImg() {
    this.downloadURL = null;
  }

  editImg() {
    this.downloadURL = this.user.imgProfile;
    this.editImage = true;
  }

}
