import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fake-news-hacknarok';
  sliderSelectedValue=50;
  authChanged(e){
    this.sliderSelectedValue=e;
  }
}
