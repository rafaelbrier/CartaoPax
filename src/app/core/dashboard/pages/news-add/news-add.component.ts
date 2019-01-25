import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FireStorageService } from '../../../services/firebase-storage/fire-storage.service';
import { SharedService } from 'src/app/core/services/shared-services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { whiteSpace } from 'src/app/core/components/validators/custom-validators';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  file: File;
  progressImg: number;
  inProgress: boolean = false;
  uploadError: boolean = false;
  downloadURL: String = undefined;

  // Form
  newsManagerForm: FormGroup;
  submitting: boolean = false;

  constructor(private fireStorageService: FireStorageService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.newsManagerFormBuilder();
  }
 
  submitCommentForm() {
    this.sharedService.triggerValidation(this.newsManagerForm);
    if (this.newsManagerForm.invalid) {
      return;
    }
    this.submitting = true;
    this.modal.openModal("Publicar Notícia", "Tem certeza que deseja publicar a notícia?", "normal", true)
      .then(() => {
        if (this.file) {

          this.retrieveImg()
            .then((url) => {

              this.downloadURL = url;
              this.sendNews();

            }).catch(() => { this.submitting = false; return });
        } else {
          this.sendNews();
        }
      }).catch(() => { this.submitting = false; return });
  }

  sendNews() {
    const values = this.newsManagerForm.value;
    const news = {
      title: values.title,
      body: values.body,
      imgPath: this.downloadURL
    };
    this.newsService.registerNews(news)
      .subscribe((res: any) => {
        this.submitting = false;
        this.newsManagerForm.reset();
        this.modal.openModal("Sucesso!",
          `A notícia foi publicada. <a href="/news/${res.id}">Clique aqui </a> para visualizá-la.`
          , "success");
      }, err => {
        this.submitting = false;
        this.modal.openModal("Erro!", "Houve algum erro ao publicar a notícia. Por favor tente novamente.", "fail");
        console.log(err)
      })
  }

  newsManagerFormBuilder() {
    this.newsManagerForm = this.formBuilder.group({
      title: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
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

    return uploadTask.uploadTask.then(() => {
      return uploadTask.uploadTask.snapshot.ref.getDownloadURL()
        .then(url => {
          return url;
        });
    });
  }
}
