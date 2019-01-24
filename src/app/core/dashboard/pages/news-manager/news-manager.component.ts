import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FireStorageService } from '../../../services/firebase-storage/fire-storage.service';
import { SharedService } from 'src/app/core/services/shared-services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { whiteSpace } from 'src/app/core/components/validators/custom-validators';

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

  // Form
  newsManagerForm: FormGroup;
  submitting: boolean = false;

  constructor(private fireStorageService: FireStorageService,
              private sharedService: SharedService,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit() {
    this.newsManagerFormBuilder();
  }


  submitCommentForm() {
    this.sharedService.triggerValidation(this.newsManagerForm);
    if (this.newsManagerForm.invalid) {
      return;
    } 
    this.modal.openModal("Publicar Notícia", "Tem certeza que deseja publicar a notícia?", "normal", true)
    .then(res => {
      console.log("then", res)
    }).catch(err => {
      console.log("catch", err)
    })
    const values = this.newsManagerForm.value;
    console.log(values)
    // const news = {
    //     title: values.name,
    //     body: values.comment,
    //     //imgPath: values.imgUrl
    //   };
  }

  newsManagerFormBuilder() {
    this.newsManagerForm = this.formBuilder.group({
      title: ['', [Validators.required, whiteSpace]],
      body: ['', [Validators.required, whiteSpace]],    
      image: [''],    
    });
  }

  get f() { return this.newsManagerForm.controls; }

  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];

    if (!this.sharedService.checkIfIsImage(this.file))
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
