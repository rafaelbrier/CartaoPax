import { Injectable } from '@angular/core';
import { myConstants } from './constants';
import { HttpClient } from '@angular/common/http';
import { newsData } from './news.service';

export interface commentData {
  id?: string,
  authorName: string,
  authorEmail?: string,
  imgProfile?: string,
  body: string,
  news: newsData
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }
  
  registerComment(data: commentData, newsId: string) {
    return this.http.post(`${myConstants.restBaseUrl}${myConstants.newsPath}/${newsId}${myConstants.commentsPath}`, {
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      imgProfile: data.imgProfile ? data.imgProfile : null,
      body: data.body,
      news: data.news
    });
  }

  findAllComments() {
    return this.http.get(myConstants.restBaseUrl + myConstants.newsPath);
  }

  findCommentsByNewsIdPageable(newsId: string, page: number, size: number, sort: string, order: string) {
    return this.http.get(
        `${myConstants.restBaseUrl}${myConstants.newsPath}/${newsId}${myConstants.commentsPath}?page=${page}&size=${size}&sort=${sort},${order}`
        );
  }

  removeCommentById(id: string) {
    return this.http.delete(`${myConstants.restBaseUrl}${myConstants.commentsPath}/${id}`);
  }
}
