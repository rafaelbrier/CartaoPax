import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../core/components/utils/modal/modal.component';
import { NewsService, newsData } from 'src/app/core/services/news.service';
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

  category: string = "";
  categoryOptions: any[] = [{ value: "", info: "Todas" }, { value: "N", info: "Notícia" }, { value: "O", info: "Obituário" }];
  categoryMask: string;


  newsData: any;
  news: newsData[];
  pages: number = 0;
  limit: number = 10;
  orderBy: string = "date";
  orderAscOrDesc: string = "desc";

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.category);
  }

  showImage(imgPath: string) {
    this.modal.openModal("Imagem Principal da Notícia", imgPath, "image");
  }

  showBody(body: string) {
    this.modal.openModal("Corpo da Notícia", body);
  }

  onCategoryChange(category: string) {
    this.category = category;
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.category);

  }

  deleteNews(newsId: string) {
    this.modal.openModal("Deletar Notícia", `Tem certeza que deseja deletar a notícia de id <b>#${newsId}</b>?`, "normal", true)
      .then(() => {
        this.modal.loaderModal();

        this.newsService.removeNews(newsId)
          .subscribe(() => {
            this.modal.closeAll();
            this.modal.openModal("Notícia Deletada", `A notícia de id <b>#${newsId}</b> foi deletada com sucesso.`, "success");
            this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.category);
          }, () => {
            this.modal.closeAll();
            this.modal.openModal("Erro!", "Houve algum erro ao deletar a notícia. Por favor tente novamente mais tarde.", "fail");
          });

      }).catch(() => { return });
  }

  sortBy(orderBy: string) {
    this.orderBy = orderBy;
    this.orderAscOrDesc = this.orderAscOrDesc === "asc" ? "desc" : "asc";
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.category);
  }

  editNews(news: any) {
    this.router.navigate(['dashboard/newsadd', news], { skipLocationChange: true });
  }

  onSearchChange(searchValue: string) {
    this.searchValue = searchValue;
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.category);
  }

  onSelectChange(limitValue: number) {
    this.limit = limitValue;
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.category);
  }

  onPageChange(page: number) {
    this.pages = page - 1;
    this.loadNews(this.pages, this.limit, this.orderBy, this.orderAscOrDesc, this.searchValue, this.category);
  }

  loadNews(pages: number, limit: number, orderBy: string, orderAscOrDesc: string, searchTerm: string, category: string) {

    this.isBoxLoading = true;
    this.boxLoadingError = false;

    this.newsService.findNewsPageable(pages, limit, orderBy, orderAscOrDesc, searchTerm, category)

      .subscribe((resData): any => {
        this.newsData = resData;
        this.news = this.newsData.content;
        delete this.newsData.content;
        this.pagNumberOfPages = 10 * Math.ceil(this.newsData.totalElements / this.limitValue);
        this.isBoxLoading = false;

        this.news = this.news.map((obj: any) => {
          return { ...obj, categoryMask: this.categoryOptions.filter(el => el.value == obj.category)[0]["info"] };
        });

      }, () => {
        this.isBoxLoading = false;
        this.boxLoadingError = true;
      });
  }

  goToNewsPage(data: newsData) {
    let pagePath = data.category === "N" ? "/news/" : "/obituario/";
    return pagePath + data.id;
  }
}
