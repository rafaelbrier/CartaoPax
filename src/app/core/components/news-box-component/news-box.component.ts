import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'news-box-component',
  templateUrl: './news-box.component.html',
  styleUrls: ['./news-box.component.scss']
})
export class NewsBoxComponent {

  @Input()
  isBoxLoading: boolean = false;

  @Input()
  newsData: any;

  @Input()
  error: boolean = false;

  data: any = {
    date: "-- --- ----",
    title: "Buscando....",
    body: "\n\nBuscando.... \n\n"
  };

  readMore: boolean = false;

  constructor() {   
   }

   ngOnChanges() {   
     
    if(this.error) {
      this.data.title =  "Error!";
      this.data.body = "Erro ao buscar notícias. Recarregue a página para tentar novamente."
    } else {
       this.data = this.newsData;
      if(this.newsData && this.newsData.body && this.newsData.body.length > 100) {        
        this.data.body = this.newsData.body.substr(0, 100) + "...";
        this.readMore = true;
      }      
    }
  }

}
