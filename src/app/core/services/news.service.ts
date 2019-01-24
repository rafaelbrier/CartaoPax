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
      title: data.title,
      body: data.body,
      imgPath: data.imgPath
    });
  }

  findAllNews() {
    return this.http.get(myConstants.restBaseUrl + myConstants.newsPath);
  }

  findById(newsId: String) {
    return this.http.get(`${myConstants.restBaseUrl}${myConstants.newsPath}/${newsId}`);
  }

  removeNews(newsId: String) {
    return this.http.delete(`${myConstants.restBaseUrl}${myConstants.newsPath}/${newsId}`);
  }
}
