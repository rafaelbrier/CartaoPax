import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { whiteSpace } from 'src/app/core/components/utils/validators/custom-validators';
import { NewsService, newsData } from 'src/app/core/services/news.service';
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
  uploadedFileName: string = null;
  progressImg: number;
  inProgress: boolean = false;
  uploadError: boolean = false;
  downloadURL: string = undefined;
  fileOverSize: boolean = false;
  mustBeImg: boolean = false;

  // Form
  newsManagerForm: FormGroup;
  submitting: boolean = false;

  category: string;
  categoryOptions: any[] = [{ value: "N", info: "Notícia" }, { value: "O", info: "Obituário" }];

  categoryName: string;

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
      this.newsManagerForm.patchValue({
        title: this.newsToEdit.title,
        body: this.newsToEdit.body,
        image: this.newsToEdit.imgPath,
        category: this.newsToEdit.category
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
    this.categoryName = this.categoryOptions.filter(el => el.value == this.v.category)[0]["info"];

    this.submitting = true;
    this.modal.openModal(`Publicar ${this.categoryName}`,
      `Tem certeza que deseja publicar a(o) ${this.categoryName}${this.isEditing ? ` editada(o) de id <b>#${this.newsToEdit.id}</b>` : ''}?`, "normal", true)
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
    let news: newsData = {
      id: this.isEditing ? this.newsToEdit.id : '',
      category: this.isEditing ? this.newsToEdit.category : values.category,
      title: values.title,
      body: values.body,
      imgPath: this.downloadURL
    }
    this.newsService.registerNews(news)
      .subscribe((res: any) => {
        this.modal.openModal("Sucesso!",
          `${this.categoryName} publicada(o). 
          ${news.category == 'N'
            ? `<a href="/news/${res.id}" target="_blank">Clique aqui </a> para visualizá-la(o).`
            : `<a href ="/obituario/${res.id}" target="_blank">Clique aqui </a> para visualizá-la(o).`}`
          , "success");
        if (this.isEditing) this.router.navigate(['dashboard/newsmanager']);
        this.submitComplete();
      }, (err) => {
        this.submitting = false;
        if (this.uploadedFileName) {
          this.fireStorageService.deleteImg(this.uploadedFileName, 'news-images');
        }
        this.sharedService.handleErrorResponse(err, this.modal, this.isEditing);
      })
  }

  newsManagerFormBuilder(): void {
    this.newsManagerForm = this.formBuilder.group({
      title: ['', [Validators.required, whiteSpace, Validators.maxLength(100)]],
      body: ['', [Validators.required, whiteSpace, Validators.maxLength(1000)]],
      image: [''],
      category: ['', [Validators.required, whiteSpace, Validators.maxLength(3)]]
    });
  }

  get f() { return this.newsManagerForm.controls; }
  get v() { return this.newsManagerForm.value; }

  onChange(event: EventTarget): boolean {
    this.fileOverSize = false;
    this.mustBeImg = false;

    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;

    if (!this.sharedService.checkIfIsImage(files[0])) {
      this.mustBeImg = true;
      this.removeSelectedImg();
      return false;
    }
    if (this.sharedService.isFileOverSized(files[0], 20)) {
      this.fileOverSize = true;
      this.removeSelectedImg();
      return false;
    }
    this.file = files[0];
  }

  retrieveImg(): Promise<any> {
    this.inProgress = true;
    let fileName = this.isEditing ? ("imagem-principal-" + this.newsToEdit.id) : null;
    let uploadTask = this.fireStorageService.uploadImage(this.file, 'news-images', fileName);
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
