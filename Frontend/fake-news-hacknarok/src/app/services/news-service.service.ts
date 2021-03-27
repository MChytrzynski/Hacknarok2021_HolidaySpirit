import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, Tag } from '../interfaces/news';

@Injectable()
export class NewsServiceService {
  constructor(public httpClient: HttpClient) {}
  public localNews: News[] = [];
  public tags:Tag[]=[];
  getNews(): Observable<News[]> {
    return this.httpClient.get<News[]>('http://localhost:8080/');
  }
  setTags(): void {
    this.localNews.forEach(news=>{
        news.tags.forEach(tag=>{
            if(!this.tags.some(x=>x.tagname===tag.tagname)){
                this.tags.push(tag);
            }
        })
    })
  }
}
