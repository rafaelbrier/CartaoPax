import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { commentData } from '../../services/comments-service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input()
  comment: commentData;

  @Output()
  deleteComment: EventEmitter<string> = new EventEmitter();

  charMax: number = 190;

  readMoreDataHolder: string;
  readMore: boolean = false;

  constructor() {
    if (window.outerWidth <= 768) {
      this.charMax = this.charMax - 50;
    }
  }

  ngOnInit() {
    if (this.comment) {
      if (this.comment.body && this.comment.body.length > this.charMax) {
        this.readMoreDataHolder = this.comment.body;
        this.comment.body = this.comment.body.substr(0, this.charMax) + "...";
        this.readMore = true;
      }
    }
  }

  expandText() {
    this.readMore = false;
    this.comment.body = this.readMoreDataHolder;
  }

  removeComment() {
   this.deleteComment.emit(this.comment.id);
  }

}
