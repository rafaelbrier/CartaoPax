import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/services/events-service';
import { NewsService } from 'src/app/core/services/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-obituario',
  templateUrl: './obituario.component.html',
  styleUrls: ['./obituario.component.scss']
})
export class ObituarioComponent implements OnInit {

  newsId: string = null;

  newsData: any;
  news: any;
  recentNews: any;
  isBoxLoading: boolean = false;
  boxLoadingError: boolean = false;

  newsLoadDefaultLimit: number = 5;

  constructor(private newsService: NewsService,
    private activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
    EventsService.get('BREADCRUMB').emit({ show: true, name: "OBITUÁRIO" });
    this.loadObituarios(this.newsLoadDefaultLimit);
  }

  onSearchChange(searchValue) {
    this.loadObituarios(this.newsLoadDefaultLimit, searchValue);
  }

  loadObituarios(limit: number, searchValue: string = '') {
    this.isBoxLoading = true;
    this.boxLoadingError = false;
    this.newsService.findNewsPageable(0, limit, "date", "desc", searchValue, 'O')
      .subscribe((resData): any => {
        this.newsData = resData;
        this.news = this.newsData.content;

        if (this.news && this.news.length > 0) {
          delete this.newsData.content;
          this.recentNews = this.news[0];
          if (this.activatedRoute.snapshot.params.id) {
            this.newsId = this.activatedRoute.snapshot.params.id;
          } else {
            this.newsId = this.recentNews.id;
          }
        }
        this.isBoxLoading = false;
        
      }, () => {
        this.isBoxLoading = false;
        this.boxLoadingError = true;
      })
  }

  loadObituario(data: any) {
    this.newsId = data.id;
  }

  loadMoreObituarios() {
    this.newsLoadDefaultLimit = this.newsLoadDefaultLimit + 3;
    this.loadObituarios(this.newsLoadDefaultLimit);
  }

}
