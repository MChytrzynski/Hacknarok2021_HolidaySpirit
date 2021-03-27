import { Component, Input, OnInit } from '@angular/core';
import { News } from '../interfaces/news';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.css']
})
export class NewsListItemComponent implements OnInit {

  constructor() { }
  @Input() newsInput: News;

  ngOnInit(): void {
  }

}
