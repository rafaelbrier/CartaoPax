import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FireStorageService } from '../../../services/firebase-storage/fire-storage.service';
import { SharedServices } from 'src/app/core/services/shared-services';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.scss']
})
export class NewsManagerComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  file: File;
  progressImg: number;
  inProgress: boolean = false;
  uploadError: boolean = false;
  downloadURL: String;

  constructor(private fireStorageService: FireStorageService,
              private sharedServices: SharedServices) { }

  ngOnInit() {
  }

  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];

    if (!this.sharedServices.checkIfIsImage(this.file))
    return false;

    //this.retrieveImg();
  }

  retrieveImg() {
    this.inProgress = true;
    let uploadTask = this.fireStorageService.uploadImage(this.file, 'news-images');   

    uploadTask.uploadObs((snapshot: { bytesTransferred: number; totalBytes: number; }) => {
      this.progressImg = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.progressImg = Math.round(this.progressImg);
    }, (err: string) => {
      this.modal.openModal("Erro!", "Houve algum erro ao processar a imagem. Por favor tente novamente.\n" + err, "fail");
      this.uploadError = true;
    });

    uploadTask.uploadTask.then(() => { 
      uploadTask.uploadTask.snapshot.ref.getDownloadURL()
      .then(url => {
        this.downloadURL = url;
      })
    });
  }

}
