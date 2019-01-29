import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { whiteSpace } from 'src/app/core/components/utils/validators/custom-validators';
import { NewsService } from 'src/app/core/services/news.service';
import { SharedService } from 'src/app/core/services/shared-services';
import { ModalComponent } from '../../../core/components/utils/modal/modal.component';
import { FireStorageService } from '../../../core/services/firebase-storage/fire-storage.service';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {

  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild(ModalComponent) modal: ModalComponent;

  file: File;
  progressImg: number;
  inProgress: boolean = false;
  uploadError: boolean = false;
  downloadURL: String = undefined;

  // Form
  newsManagerForm: FormGroup;
  submitting: boolean = false;

  //Edit
  isEditing: boolean = false;
  newsToEdit: any;

  constructor(private fireStorageService: FireStorageService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.newsManagerFormBuilder();
    this.checkIfIsEdit();
  }

  checkIfIsEdit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.isEditing = true;
      this.newsToEdit = this.activatedRoute.snapshot.params;
      this.newsManagerForm.setValue({
        title: this.newsToEdit.title,
        body: this.newsToEdit.body,
        image: this.newsToEdit.imgPath
      });
      this.downloadURL = this.newsToEdit.imgPath;
      //Vem do db como "null" e não null, por algum motivo
      this.downloadURL = this.downloadURL === "null" ? null : this.downloadURL;
      
    } else {
      this.isEditing = false;
      this.newsToEdit = null;
    }
  }

  submitNewsForm(): void {
    this.sharedService.triggerValidation(this.newsManagerForm);
    if (this.newsManagerForm.invalid) {
      return;
    }
    this.submitting = true;
    this.modal.openModal("Publicar Notícia",
      `Tem certeza que deseja publicar a notícia${this.isEditing ? ` editada de id <b>#${this.newsToEdit.id}</b>` : ''}?`, "normal", true)
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

  sendNews(): void {
    const values = this.newsManagerForm.value;
    let news = {};
    if (this.isEditing) {
      news = {
        id: this.newsToEdit.id,
        date: this.newsToEdit.date,
        title: values.title,
        body: values.body,
        imgPath: this.downloadURL
      }
    } else {
      news = {
        title: values.title,
        body: values.body,
        imgPath: this.downloadURL
      }
    }
    this.newsService.registerNews(news)
      .subscribe((res: any) => {
        this.modal.openModal("Sucesso!",
          `A notícia foi publicada. <a href="/news/${res.id}">Clique aqui </a> para visualizá-la.`
          , "success");
        if (this.isEditing) this.router.navigate(['dashboard/newsmanager']);
        this.submitComplete();
      }, err => {
        this.submitting = false;
        this.modal.openModal("Erro!", "Houve algum erro ao publicar a notícia. Por favor tente novamente mais tarde.", "fail");
      })
  }

  newsManagerFormBuilder(): void {
    this.newsManagerForm = this.formBuilder.group({
      title: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      body: ['', [Validators.required, whiteSpace]],
      image: [''],
    });
  }

  get f() { return this.newsManagerForm.controls; }

  onChange(event: EventTarget): boolean {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];

    if (!this.sharedService.checkIfIsImage(this.file))
      return false;
  }

  retrieveImg(): Promise<any> {
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

  removeMainImg() {
    this.downloadURL = null;
  }

  submitComplete() {
    this.inProgress = false;
    this.submitting = false;
    this.isEditing = false;
    this.newsManagerForm.reset();
    this.removeSelectedImg();
  }

  removeSelectedImg() {
    this.file = null;
    this.inputFile.nativeElement.value = '';
  }
}
