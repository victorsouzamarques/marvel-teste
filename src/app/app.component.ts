import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  points: number;
  heroList: any = [];
  constructor() {}
  
  ngOnInit() {
    
  }

  recivePoints(recivePoints){
    this.points = recivePoints.points;
  }

  changeHeroApp(){
    console.log(JSON.parse(localStorage.getItem('heroes')));
  }
}
