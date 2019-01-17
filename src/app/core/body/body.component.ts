import { Component, OnInit } from '@angular/core';
import { DatabaseApiService } from '../services/database-api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  newsData: any = [{},{},{},{}];
  isBoxLoading: boolean = false;
  boxLoadingError: boolean= false;

  constructor(private dabaseApiService: DatabaseApiService) { }

  ngOnInit() {
    this.isBoxLoading = true;

    this.dabaseApiService.findAllNews()
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
