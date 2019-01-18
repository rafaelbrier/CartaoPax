import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input()
  comment: any;

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

}
