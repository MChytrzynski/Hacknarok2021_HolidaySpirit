import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';


@Injectable()
export class NewsServiceService {

constructor(public httpClient:HttpClient) { }

getNews():Observable<News[]>{
    return this.httpClient.get<News[]>('http://localhost:8080/')
  }
}
