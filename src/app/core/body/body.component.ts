import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  newsData: any = [{},{},{},{}];
  isBoxLoading: boolean = false;
  boxLoadingError: boolean= false;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.isBoxLoading = true;

    this.newsService.findAllNews()
    .subscribe(resData =>{
      this.newsData = resData;
      this.isBoxLoading = false;
    }, error => {
      this.isBoxLoading = false;
      this.boxLoadingError = true;
      console.log(error)
    })
  }

}
