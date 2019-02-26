import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../services/shared-services';

@Component({
  selector: 'app-obituario-box',
  templateUrl: './obituario-box.component.html',
  styleUrls: ['./obituario-box.component.scss']
})
export class ObituarioBoxComponent implements OnInit {

  @Input()
  newsData: any;

  @Output() outData = new EventEmitter();

  maxChar: number = 100;

  data: any = {
    date: "-- --- ----",
    title: "Buscando....",
    body: "\n\nBuscando.... \n\n"
  };

  readMore: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
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

  openObituario(data: any) {
    this.outData.emit(data);
  }
}
