import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'news-box-component',
  templateUrl: './news-box.component.html',
  styleUrls: ['./news-box.component.scss']
})
export class NewsBoxComponent {

  @Input()
  newsData: any;

  data: any = {
    date: "-- --- ----",
    title: "Buscando....",
    body: "\n\nBuscando.... \n\n"
  };

  readMore: boolean = false;

  constructor(private router: Router) {   
   }

   ngOnChanges() {    
       this.data = this.newsData;
      if(this.newsData && this.newsData.body && this.newsData.body.length > 100) {        
        this.data.body = this.newsData.body.substr(0, 100) + "...";
        this.readMore = true;           
    }
  }

  goToDetail() {
    this.router.navigate(['/news/' + this.data.id]);
  }

  goToDetailComments() {
    location.href = '/news/' + this.data.id + '/#comments';
  }

}
