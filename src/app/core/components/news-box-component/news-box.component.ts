import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-services';

@Component({
  selector: 'news-box-component',
  templateUrl: './news-box.component.html',
  styleUrls: ['./news-box.component.scss']
})
export class NewsBoxComponent implements OnChanges  {

  @Input()
  newsData: any;

  maxChar: number = 100;

  data: any = {
    date: "-- --- ----",
    title: "Buscando....",
    body: "\n\nBuscando.... \n\n"
  };

  readMore: boolean = false;

  constructor(private router: Router, private sharedService: SharedService) {
  }

  ngOnChanges() {
    if (this.newsData) {
      this.data = this.newsData;    

      this.newsData.body = this.sharedService.htmlToText(this.newsData.body);  //conver HTML to Plain Text  
      let textOverFlow = this.sharedService.textOverFlow(this.newsData.body, this.maxChar, 3);
      this.data.body = textOverFlow.text;
      this.readMore = textOverFlow.overflow;
    }
  }

  goToDetail() {
    this.router.navigate(['/news/' + this.data.id]);
  }

  goToDetailComments() {
    this.router.navigate(['/news/' + this.data.id], {fragment: "comments"});
  }

}
