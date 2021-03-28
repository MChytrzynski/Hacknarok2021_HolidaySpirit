import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, Tag } from '../interfaces/news';

@Injectable()
export class NewsServiceService {
  constructor(public httpClient: HttpClient) {}
  public localNews: News[] = [];
  public tags:Tag[]=[];
  exampleTags:Tag[]=[{id:0,tagname:'World'},{id:0,tagname:'Health'},{id:0,tagname:'Sport'},{id:0,tagname:'Politics'},{id:0,tagname:'Science'},{id:0,tagname:'Tech'},{id:0,tagname:'Religion'},{id:0,tagname:'Covid'},{id:0,tagname:'Finance'}];
  getNews(): Observable<News[]> {
    return this.httpClient.get<News[]>('http://localhost:8080/');
  }
  setTags(): void {
        this.localNews.forEach(x=>{
            x.tags=[];
            const tagNumber=Math.floor(Math.random() * 8); 
            x.tags.push(this.exampleTags[tagNumber]);
            const tagNumber2=Math.floor(Math.random() * 8); 
            x.tags.push(this.exampleTags[tagNumber]);
        })
        this.tags=this.exampleTags;
  }
}

