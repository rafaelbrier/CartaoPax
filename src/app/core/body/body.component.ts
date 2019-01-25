import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  galleryOptions: any;
  galleryImages: any;

  newsData: any;
  news: any;
  recentNews: any;
  isBoxLoading: boolean = false;
  boxLoadingError: boolean = false;

  newsLoadDefaultLimit: number = 7;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.initGallery();
    this.loadNews(this.newsLoadDefaultLimit);
  }


  loadNews(limit: number) {
    this.isBoxLoading = true;
    this.newsService.findNewsPageable(0, limit, "date", "desc")
      .subscribe((resData): any => {
        this.newsData = resData;
        this.news = this.newsData.content;
        delete this.newsData.content;
        this.recentNews = this.news.shift();
        this.isBoxLoading = false;
      }, error => {
        this.isBoxLoading = false;
        this.boxLoadingError = true;
        console.log(error)
      })
  }

  loadMoreNews() {
    this.newsLoadDefaultLimit = this.newsLoadDefaultLimit + 3;
    this.loadNews(this.newsLoadDefaultLimit);
  }


  initGallery() {
    // [
    //   { "imagePercent": 80, "thumbnailsPercent": 20, "thumbnailsColumns": 6, "thumbnailsMargin": 0, "thumbnailMargin": 0 }
    //   { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 }
    //   { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    //   ]
    this.galleryOptions = [
      {
        "thumbnailsColumns": 6, "thumbnailsPercent": 20, "imagePercent": 100, "thumbnailMargin": 0,
        "thumbnailsMargin": 0, "thumbnailsOrder": 2, "previewFullscreen": true, "previewKeyboardNavigation": true,
        "width": "100%",
        "imageAutoPlay": true, "imageAutoPlayInterval": 5000, "spinnerIcon": "fas fa-spinner fa-pulse fa-3x fa-fw",
        "previewZoom": true, "previewCloseOnClick": true
      },
      { "breakpoint": 600, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ]

    this.galleryImages = [
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
  }

}
