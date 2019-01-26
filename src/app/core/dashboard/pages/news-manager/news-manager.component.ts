import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../components/utils/modal/modal.component';
import { NewsService } from 'src/app/core/services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.scss']
})
export class NewsManagerComponent implements OnInit {

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

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue);
  }

  showImage(imgPath: string) {
    this.modal.openModal("Imagem Principal da Notícia", imgPath , "image");
  }

  showBody(body: string) {
    this.modal.openModal("Corpo da Notícia", body);
  }

  deleteNews(newsId: string) {
    this.modal.openModal("Deletar Notícia", `Tem certeza que deseja deletar a notícia de id <b>#${newsId}</b>?`, "normal", true)
    .then(() => {      
      this.modal.loaderModal();

      this.newsService.removeNews(newsId)
      .subscribe(() => {
        this.modal.closeAll();
        this.modal.openModal("Notícia Deletada", `A notícia de id <b>#${newsId}</b> foi deletada com sucesso.`, "success");
        this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue);
      }, () => {
        this.modal.closeAll();
        this.modal.openModal("Erro!", "Houve algum erro ao deletar a notícia. Por favor tente novamente mais tarde.", "fail");
      });

    }).catch(()=>{return});
  }

  editNews(news: any) {
    this.router.navigate(['dashboard/newsadd', news], { skipLocationChange: true });
  }
  
  onSearchChange(searchValue: string) {
    this.searchValue = searchValue;
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue);
  }
  
  onSelectChange(limitValue: number) {
    this.limit = limitValue;
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue);
  }

  onPageChange(page: number) {
    this.pages = page - 1;
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue);
  }
  
  loadNews(pages: number, limit: number, orderBy: string, orderAscOrDesc: string, searchTerm: string) {

    this.isBoxLoading = true;
    this.boxLoadingError = false;

    this.newsService.findNewsPageable(pages, limit, orderBy, orderAscOrDesc, searchTerm)

      .subscribe((resData): any => {
        this.newsData = resData;
        this.news = this.newsData.content;
        delete this.newsData.content;
        this.pagNumberOfPages = 10*Math.ceil(this.newsData.totalElements / this.limitValue);
        this.isBoxLoading = false;

      }, () => {
        this.isBoxLoading = false;
        this.boxLoadingError = true;
      });

  }
}
