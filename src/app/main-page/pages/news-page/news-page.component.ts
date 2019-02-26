import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService, breadCrumbEventModel, commentCountEventModel } from 'src/app/core/services/events-service';
import { UsersService } from 'src/app/core/services/users-service';
import { ModalComponent } from '../../../core/components/utils/modal/modal.component';
import { whiteSpace } from '../../../core/components/utils/validators/custom-validators';
import { CommentsService } from '../../../core/services/comments-service';
import { NewsService, newsData } from '../../../core/services/news.service';
import { SharedService } from '../../../core/services/shared-services';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() id: string;

  @ViewChild(ModalComponent) modal: ModalComponent;

  charMax: number = 280;
  commentsDefaultLimit: number = 4;

  isLoading: boolean = false;
  loadError: boolean = false;

  fakeData: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
  laborum.`;
  readMoreDataHolder: string;
  readMore: boolean = false;

  newsData: any = {};
  newsId: string;
  commentsData: any = {};
  comments: any = [];

  userLoggedIn: boolean = false;
  userName: string;
  userImgProfile: string;
  userSubscription: Subscription;
  // form
  commentForm: FormGroup;
  submitting: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private commentsService: CommentsService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer,
    private usersService: UsersService
  ) {
    if (window.outerWidth <= 768) {
      this.charMax = this.charMax - 100;
    }
  }

  ngOnInit() {
    EventsService.get<breadCrumbEventModel>('BREADCRUMB').emit({ show: true, name: "NOTÍCIAS" });

    this.isLoading = true;
    this.commentFormBuilder();

    //Temporário
    if (this.fakeData && this.fakeData.length > this.charMax) {
      this.readMoreDataHolder = this.fakeData;
      this.fakeData = this.fakeData.substr(0, this.charMax) + "...";
      this.readMore = true;
    }
    /////

    this.newsId = this.activatedRoute.snapshot.params.id || this.id;
    if (this.newsId) {
      this.findNewsById();
    }

    this.userSubscription = this.usersService.currentUser.subscribe(u => {
      this.userLoggedIn = u ? true : false;
      if (this.userLoggedIn) {
        this.f.name.disable();
        this.f.email.disable();
      } else {
        this.f.name.enable();
        this.f.email.enable();
      }
      this.userName = u.name;
      this.userName = this.userName ? this.userName.split(' ').slice(0, 2).join(' ') : "Anônimo";
      this.userImgProfile = u.imgProfile;
    });
  }

  ngOnChanges(changes: any) {
    if (changes.id) {
     this.newsId = changes.id.currentValue;
     this.findNewsById();
    }
  }

  ngAfterViewInit(): void {
    this.sharedService.scrollToAnchor(this.activatedRoute.snapshot.fragment);        
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  findNewsById() {
    this.newsService.findById(this.newsId)
      .subscribe((resData: newsData) => {
        if (resData) {
          this.newsData = resData;
          this.newsData.body = this.sanitizer.bypassSecurityTrustHtml(this.newsData.body);
          this.isLoading = false;
          EventsService.get<commentCountEventModel>('COMMENTCOUNT')
          .emit({id: this.newsData.id, commentCount: this.newsData.commentCount});
        } else {
          this.modal.openModal("Erro!", `Não existe notícia com identificação <b>#${this.newsId}</b>.`, "fail")
            .then(() => { location.href = '/home' + '/#news'; })
            .catch(() => { location.href = '/home' + '/#news'; })
        }
      }, () => {
        this.isLoading = false;
        this.loadError = true;
      });
    this.loadComments(this.commentsDefaultLimit);
  }

  // FORM FUNCTIONS
  commentFormBuilder() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, whiteSpace]],
      name: ['', [Validators.required, whiteSpace]],
      email: ['', [Validators.required, Validators.email, whiteSpace]],
    });
  }

  submitCommentForm() {
    this.sharedService.triggerValidation(this.commentForm);
    if (this.commentForm.invalid) {
      return;
    }

    this.submitting = true;
    const values = this.commentForm.value;
    let comment: any;

    if (this.userLoggedIn) {
      comment = {
        authorName: this.userName,
        authorEmail: "",
        imgProfile: this.userImgProfile,
        body: values.comment,
        news: this.newsData
      }
    } else {
      comment = {
        authorName: values.name,
        authorEmail: values.email,
        body: values.comment,
        news: this.newsData
      };
    }

    this.commentsService.registerComment(comment, this.newsId)
      .subscribe(() => {
        this.submitting = false;
        this.commentForm.reset();
        this.loadComments(this.commentsDefaultLimit);
        this.findNewsById();

        this.modal.openModal("Sucesso!", "Seu comentário foi adicionado.", "success");
      }, () => {
        this.submitting = false;
        this.modal.openModal("Erro!", "Houve algum erro ao processar seu comentário. Por favor tente novamente mais tarde.", "fail");
      })
  }

  // convenience getter for easy access to form fields
  get f() { return this.commentForm.controls; }

  // FORM FUNCTIONS END -------------------------------------


  loadMoreComments() {
    this.commentsDefaultLimit = 2 * this.commentsDefaultLimit;
    this.loadComments(this.commentsDefaultLimit);
  }

  loadComments(limit: number) {
    this.commentsService.findCommentsByNewsIdPageable(this.newsId, 0, limit, "date", "desc")
      .subscribe(resData => {
        this.commentsData = resData;
        this.comments = this.commentsData.content;
        delete this.commentsData.content;
      })
  }

  deleteComment(id: string) {
    this.commentsService.removeCommentById(id)
      .subscribe(() => {
        this.loadComments(this.commentsDefaultLimit);
        this.findNewsById();
      });
  }

  expandText() {
    this.readMore = false;
    this.fakeData = this.readMoreDataHolder;
  }
}
