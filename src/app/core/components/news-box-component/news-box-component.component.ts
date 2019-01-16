import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'news-box-component',
  templateUrl: './news-box-component.component.html',
  styleUrls: ['./news-box-component.component.scss']
})
export class NewsBoxComponentComponent implements OnInit {

  boxLoading: boolean;

  constructor() {
    this.boxLoading = false;
   }

  ngOnInit() {
  }

}
