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
      x.forEach(y=>{
        if(y){
          this.displayedNews.push(y);
        }
      })
      this.displayedNews.map(y=>y.url='https://'+y.title.toLowerCase().replace(' ','.'));
      var today = new Date() as any;
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      console.log(today);
      this.displayedNews.map(x=>x.publishDate=today);
      this.displayedNews.map(x=>x.veracityAI=Math.round(x.veracityAI*10)/10);
      this.newsService.localNews=this.displayedNews;
      this.newsService.setTags();
      this.displayedTags=this.newsService.tags;
      this.displayedNews=this.newsService.localNews;
      console.log(this.displayedNews[0]);
    });
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.filterNews();
  }
  filterNews(){
    this.displayedNews=this.newsService.localNews.filter(x=>{
      if(x.veracityAI<this.sliderValue){
        return false;
      }
      if(!this.selectedInterfaceTags.some(tag=>x.tags.some(xTag=>xTag.tagname===tag))){
        return false;
      }
      return true;
    })
  }
  isChipSelected(tagName:string):boolean{
    if(this.selectedInterfaceTags.some(x=>x===tagName)){
      return true;
    }
    return false;
  }
  toggleChipSelection(tagName:string){
    if(this.isChipSelected(tagName)){
      this.filterNews();
      this.selectedInterfaceTags.splice(this.selectedInterfaceTags.findIndex(x=>x===tagName),1)
    }else{
      this.filterNews();
      this.selectedInterfaceTags.push(tagName);
    }
  }
  removeIntro(intro:HTMLElement){
    intro.style.top="-100vh";
  }



}
