import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommentsService } from '../../services/comments-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { whiteSpace } from '../../components/validators/custom-validators';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  charMax: number = 280;
  commentsDefaultLimit: number = 2;

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
  newsId: String;
  commentsData: any = {};
  comments: any = [];

  // form
  commentForm: FormGroup;
  submitting: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private commentsService: CommentsService,
    private formBuilder: FormBuilder
  ) {
    if (window.outerWidth <= 768) {
      this.charMax = this.charMax - 100;
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.commentFormBuilder();
    if (this.fakeData && this.fakeData.length > this.charMax) {
      this.readMoreDataHolder = this.fakeData;
      this.fakeData = this.fakeData.substr(0, this.charMax) + "...";
      this.readMore = true;
    }

    this.newsId = this.activatedRoute.snapshot.params.id;
    if (this.newsId) {
      this.newsService.findById(this.newsId)
        .subscribe(resData => {
          this.newsData = resData;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
          this.loadError = true;
        });
      this.loadComments(this.commentsDefaultLimit)
    }
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
    this.triggerValidation(this.commentForm);
    if (this.commentForm.invalid) {
      return;
    } else {
      this.submitting = true;
      const values = this.commentForm.value;
      const comment = {
        authorName: values.name,
        authorEmail: values.email,
        body: values.comment,
        news: this.newsData
      };
      this.commentsService.registerComment(comment, this.newsId)
        .subscribe(() => {
          this.submitting = false;
          this.commentForm.reset();
          this.loadComments(this.commentsDefaultLimit);
        }, err => {
          this.submitting = false;
          console.log(err)
        })
    }
  }

  triggerValidation(formName: FormGroup) {
    Object.keys(formName.controls).forEach(field => {
      const control = formName.get(field);
      control.markAsTouched({ onlySelf: true });
    });
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

  expandText() {
    this.readMore = false;
    this.fakeData = this.readMoreDataHolder;
  }

}
