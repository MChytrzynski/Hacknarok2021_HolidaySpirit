import { Component, Input, OnInit, SimpleChange } from '@angular/core';
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
  @Input() sliderValue: number;
  selectedSentiment:number=0;
  selectedTags:string[]=[];
  selectedInterfaceTags:string[]=[];
  constructor(public newsService:NewsServiceService) { }
  
  ngOnInit(): void {
    this.newsService.getNews().subscribe(x=>{
      this.newsService.localNews=x;
      this.newsService.setTags();
      this.selectedTags=this.newsService.tags.map(x=>x.tagname);
      this.displayedTags=this.newsService.tags;
      this.displayedNews=x;
    });
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.filterNews();
  }
  filterNews(){
    this.displayedNews=this.newsService.localNews.filter(x=>{
      if(x.veracityAI<this.sliderValue||x.veracityUser<this.selectedSentiment){
        return false;
      }
      if(!this.selectedTags.some(tag=>x.tags.some(xTag=>xTag.tagname===tag))){
        return false;
      }
      return true;
    })
  }



}
