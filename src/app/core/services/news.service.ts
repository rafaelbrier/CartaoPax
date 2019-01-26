import { Injectable } from '@angular/core';
import { myConstants } from './constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }
  
  registerNews(data: any) {
    return this.http.post(myConstants.restBaseUrl + myConstants.newsPath, {
      id: data.id ? data.id : '',
      date: data.date ? data.date : '',
      title: data.title,
      body: data.body,
      imgPath: data.imgPath
    });
  }

  findAllNews() {
    return this.http.get(myConstants.restBaseUrl + myConstants.newsPath);
  }

  findNewsPageable(page: number, size: number, sort: String, order: String) {
    return this.http.get(
        `${myConstants.restBaseUrl}${myConstants.newsPath}?page=${page}&size=${size}&sort=${sort},${order}`
        );
  }

  findById(newsId: String) {
    return this.http.get(`${myConstants.restBaseUrl}${myConstants.newsPath}/${newsId}`);
  }

  removeNews(newsId: String) {
    return this.http.delete(`${myConstants.restBaseUrl}${myConstants.newsPath}/${newsId}`);
  }
}
