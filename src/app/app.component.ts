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
  // função que armazena os pontos que o usuario ganhou ou perdeu, usando @Output() e @Input() como ferramenta.
  recivePoints(recivePoints){
    this.points = recivePoints.points;
  }
  // ja aqui ao inves de pegar um parametro de outro component por @Output e @Input eu utilizei o LocalStorage para mostrar outra tecnologia do angular.
  changeHeroApp(){
    this.heroList = JSON.parse(localStorage.getItem('heroes'));
  }
}
