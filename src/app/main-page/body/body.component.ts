import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { EventsService } from 'src/app/core/services/events-service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  clubGalleryOptions: any;
  clubGalleryImages: any;

  partnersGalleryOptions: any;
  partnersGalleryImages: any;

  newsData: any;
  news: any;
  recentNews: any;
  isBoxLoading: boolean = false;
  boxLoadingError: boolean = false;

  newsLoadDefaultLimit: number = 7;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.initGallery();
    EventsService.get('BREADCRUMB').emit({show: false});
    this.loadNews(this.newsLoadDefaultLimit);
  }


  loadNews(limit: number) {
    this.isBoxLoading = true;
    this.boxLoadingError = false;
    this.newsService.findNewsPageable(0, limit, "date", "desc")
      .subscribe((resData): any => {
        this.newsData = resData;
        this.news = this.newsData.content;
        delete this.newsData.content;
        this.recentNews = this.news.shift();
        this.isBoxLoading = false;
      }, () => {
        this.isBoxLoading = false;
        this.boxLoadingError = true;
      })
  }

  loadMoreNews() {
    this.newsLoadDefaultLimit = this.newsLoadDefaultLimit + 3;
    this.loadNews(this.newsLoadDefaultLimit);
  }

  initGallery() {
    this.clubGalleryOptions = [
      {
        "thumbnailsColumns": 6, "thumbnailsPercent": 20, "imagePercent": 100, "thumbnailMargin": 0,
        "thumbnailsMargin": 0, "thumbnailsOrder": 2, "previewFullscreen": true, "previewKeyboardNavigation": true,
        "width": "100%",
        "imageAutoPlay": true, "imageAutoPlayInterval": 5000, "spinnerIcon": "fas fa-spinner fa-pulse fa-3x fa-fw",
        "previewZoom": true, "previewCloseOnClick": true
      },
      { "breakpoint": 767, "width": "100%", "height": "300px", "thumbnailsColumns": 3,
      "thumbnailsPercent": 25 },
    ]

    this.clubGalleryImages = [
      {
        small: '../assets/images/gallery/gallery1_tn.jpg',
        medium: '../assets/images/gallery/gallery1med.jpg',
        big: '../assets/images/gallery/gallery1.jpg'
      },
      {
        small: '../assets/images/gallery/gallery2_tn.jpg',
        medium: '../assets/images/gallery/gallery2med.jpg',
        big: '../assets/images/gallery/gallery2.jpg'
      },
      {
        small: '../assets/images/gallery/gallery3_tn.jpg',
        medium: '../assets/images/gallery/gallery3med.jpg',
        big: '../assets/images/gallery/gallery3.jpg'
      },
      {
        small: '../assets/images/gallery/gallery4_tn.jpg',
        medium: '../assets/images/gallery/gallery4med.jpg',
        big: '../assets/images/gallery/gallery4.jpg'
      },
      {
        small: '../assets/images/gallery/gallery5_tn.jpg',
        medium: '../assets/images/gallery/gallery5med.jpg',
        big: '../assets/images/gallery/gallery5.jpg'
      },
      {
        small: '../assets/images/gallery/gallery6_tn.jpg',
        medium: '../assets/images/gallery/gallery6med.jpg',
        big: '../assets/images/gallery/gallery6.jpg'
      },
      {
        small: '../assets/images/gallery/gallery7_tn.jpg',
        medium: '../assets/images/gallery/gallery7med.jpg',
        big: '../assets/images/gallery/gallery7.jpg'
      },
      {
        small: '../assets/images/gallery/gallery8_tn.jpg',
        medium: '../assets/images/gallery/gallery8med.jpg',
        big: '../assets/images/gallery/gallery8.jpg'
      },
    ];

    this.partnersGalleryOptions = [
      { "image": false, "width": "90%", "height": "150px", "thumbnailsPercent": 100,
        "thumbnailSize": "contain", "thumbnailsColumns": 6, "thumbnailsArrows": true,
        "preview": false, "previewInfinityMove": true, "thumbnailsArrowsAutoHide": true,
        "arrowPrevIcon": "fas fa-chevron-circle-left text-success", "arrowNextIcon": "fas fa-chevron-circle-right text-success" },
      { "breakpoint": 767, "width": "100%", "height": "150px", "thumbnailsColumns": 2 }
    ]

    this.partnersGalleryImages = [{
      small: '../assets/images/parceiros/parceiro1.jpg',
      medium: '../assets/images/parceiros/parceiro1.jpg',
      big: '../assets/images/parceiros/parceiro1.jpg'
    },
    {
      small: '../assets/images/parceiros/parceiro2.jpg',
      medium: '../assets/images/parceiros/parceiro2.jpg',
      big: '../assets/images/parceiros/parceiro2.jpg'
    },
    {
      small: '../assets/images/parceiros/parceiro3.jpg',
      medium: '../assets/images/parceiros/parceiro3.jpg',
      big: '../assets/images/parceiros/parceiro3.jpg'
    },
    {
      small: '../assets/images/parceiros/parceiro4.jpg',
      medium: '../assets/images/parceiros/parceiro4.jpg',
      big: '../assets/images/parceiros/parceiro4.jpg'
    },{
      small: '../assets/images/parceiros/parceiro1.jpg',
      medium: '../assets/images/parceiros/parceiro1.jpg',
      big: '../assets/images/parceiros/parceiro1.jpg'
    },
    {
      small: '../assets/images/parceiros/parceiro2.jpg',
      medium: '../assets/images/parceiros/parceiro2.jpg',
      big: '../assets/images/parceiros/parceiro2.jpg'
    },
    {
      small: '../assets/images/parceiros/parceiro3.jpg',
      medium: '../assets/images/parceiros/parceiro3.jpg',
      big: '../assets/images/parceiros/parceiro3.jpg'
    },
    {
      small: '../assets/images/parceiros/parceiro4.jpg',
      medium: '../assets/images/parceiros/parceiro4.jpg',
      big: '../assets/images/parceiros/parceiro4.jpg'
    }];

  }


}
