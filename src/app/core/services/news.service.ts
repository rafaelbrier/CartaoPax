import { Injectable } from '@angular/core';
import { myConstants } from './constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }
  
  registerNews(data: any) {
    return this.http.post(myConstants.restBaseUrl + myConstants.newsPath, {
      title: data.title,
      body: data.body,
    });
  }

  findAllNews() {
    return this.http.get(myConstants.restBaseUrl + myConstants.newsPath);
  }

  findById(newsId) {
    return this.http.get(`${myConstants.restBaseUrl}${myConstants.newsPath}/${newsId}`);
  }

  removeNews(newsId: any) {
    return this.http.delete(`${myConstants.restBaseUrl}${myConstants.newsPath}/${newsId}`);
  }

  test() {
    console.log("Teste")
  }
}
