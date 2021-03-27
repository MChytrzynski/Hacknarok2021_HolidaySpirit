import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news:any[]=[1,1,1,1,1,1,1,1,1,1]
  loading:boolean=false;
  constructor() { }
  
  ngOnInit(): void {
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
