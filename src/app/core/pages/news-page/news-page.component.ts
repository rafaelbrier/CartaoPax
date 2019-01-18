import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  charMax: number = 190;

  fakeData: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
  laborum.`;
  readMoreDataHolder: string;
  readMore: boolean = false;

  newsData: any = {};

  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService) {
    if (window.outerWidth <= 768) {
      this.charMax = this.charMax - 100;
    }    
  }

  ngOnInit() {
    if(this.fakeData && this.fakeData.length > this.charMax) {  
      this.readMoreDataHolder = this.fakeData;
      this.fakeData = this.fakeData.substr(0, this.charMax) + "...";
      this.readMore = true;
    } 

    let newsId = this.activatedRoute.snapshot.params.id;
    if(newsId) {
      this.newsService.findById(newsId)
        .subscribe(resData => {
          this.newsData = resData;
        })
    }
  }

  expandText() {
    this.readMore = false;
    this.fakeData = this.readMoreDataHolder;
  }

}
