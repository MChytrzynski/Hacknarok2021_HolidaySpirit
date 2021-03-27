import { Component, OnInit } from '@angular/core';
import { News, Tag } from '../interfaces/news';
import { NewsServiceService } from '../services/news-service.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news:any[]=[1,1,1,1,1,1,1,1,1,1]
  loading:boolean=false;
  displayedNews:News[]=[];
  displayedTags:Tag[]=[];
  selectedAuthenticity:number=50;
  selectedSentiment:number=50;
  selectedTags:string[]=[];
  constructor(public newsService:NewsServiceService) { }
  
  ngOnInit(): void {
    this.newsService.getNews().subscribe(x=>{
      this.newsService.localNews=x;
      this.newsService.setTags();
      this.displayedTags=this.newsService.tags;
      this.displayedNews=x;
      console.log(this.displayedNews)
    });
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
  filterNews(){
    this.displayedNews=this.newsService.localNews.filter(x=>{
      if(x.veracityAI<this.selectedAuthenticity||x.veracityUser<this.selectedSentiment){
        return false;
      }
      if(!this.selectedTags.some(tag=>x.tags.some(xTag=>xTag.tagname===tag))){
        return false;
      }
      return true;
    })
  }


}
