import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  newsData: any;
  news: any;
  recentNews: any;
  isBoxLoading: boolean = false;
  boxLoadingError: boolean= false;

  newsLoadDefaultLimit: number = 7;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.isBoxLoading = true;
    this.loadNews(this.newsLoadDefaultLimit);    
  }


  loadNews(limit: number) {
    this.newsService.findNewsPageable(0, limit, "date", "desc")
    .subscribe((resData):any =>{
      this.newsData = resData;
      this.news = this.newsData.content;
      delete this.newsData.content;
      this.recentNews = this.news.shift();
      this.isBoxLoading = false;
    }, error => {
      this.isBoxLoading = false;
      this.boxLoadingError = true;
      console.log(error)
    })
  }

  loadMoreNews() {
    this.newsLoadDefaultLimit = this.newsLoadDefaultLimit + 3;
    this.loadNews(this.newsLoadDefaultLimit);
  }

}
