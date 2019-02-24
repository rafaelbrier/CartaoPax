import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/utils/modal/modal.component';

@Component({
  selector: 'app-boletos',
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  isBoxLoading: boolean = false;
  boxLoadingError: boolean = false;

  searchValue: string;
  limitValue: number = 10;
  limitOptions: number[] = [10, 20, 30, 40];
  pagNumberOfPages: number;

  newsData: any;
  news: any;
  pages: number = 0;
  limit: number = 10;
  orderBy: string = "date";
  orderAscOrDesc: string = "desc";

  constructor() { }

  ngOnInit() {
  }

}
