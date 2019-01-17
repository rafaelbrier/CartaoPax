import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  fakeData: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
  laborum.`;

  readMoreDataHolder: string;
  readMore: boolean = false;

  constructor() { }

  ngOnInit() {
    if(this.fakeData && this.fakeData.length > 190) {  
      this.readMoreDataHolder = this.fakeData;
      this.fakeData = this.fakeData.substr(0, 190) + "...";
      this.readMore = true;
    } 
  }

  expandText() {
    this.readMore = false;
    this.fakeData = this.readMoreDataHolder;
  }

}
