import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-news-settings',
  templateUrl: './news-settings.component.html',
  styleUrls: ['./news-settings.component.css']
})
export class NewsSettingsComponent implements OnInit {

  @Output() authenticitySliderChanged = new EventEmitter<number>();
  @Output() sentimentSliderChanged = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }
  authenticityChanged(e){
    console.log(e)
    this.authenticitySliderChanged.emit(e.value);
  }
  sentimentChanged(e){
    this.sentimentSliderChanged.emit(e);
  }

}
