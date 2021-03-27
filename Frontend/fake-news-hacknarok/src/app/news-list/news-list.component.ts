import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from '../services/news-service.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news:any[]=[1,1,1,1,1,1,1,1,1,1]
  loading:boolean=false;
  constructor(public newsService:NewsServiceService) { }
  
  ngOnInit(): void {
    this.newsService.getNews().subscribe(x=>console.log(x));
  }
  onScroll(){
    this.loading=true;
    setTimeout(() => 
    {
      this.loading=false;
      console.log('scrolled');
      this.news.push(1);
      this.news.push(1);

    },
    3000);
    
  }

}
