import { Injectable } from '@angular/core';
import { myConstants } from './constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService {

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

  removeNews(data: any) {
    return this.http.delete(myConstants.restBaseUrl + myConstants.newsPath + '/' + data.id);
  }

  test() {
    console.log("Teste")
  }
}
