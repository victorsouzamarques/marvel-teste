import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero/hero.service';
import { UtilsService } from '../services/utils/utils.service';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit {

    private _success = new Subject<string>();

    staticAlertClosed = false;
    successMessage: string;
    public loading = false;
    constructor(private heroService: HeroService, private utils: UtilsService) { }

    //Criação de image, name, clue hero para armazenar a dica ou resultado vindo da api, utilizando subscribe e httpclient.
    imageHero: string;
    nameHero: string;
    clueHero: String;
    heroList: any = [];
    pointsTotal: Number;
    help: string;

    ngOnInit() {
      //aqui eu inicio o alert para avisar o usuario sobre qual personagem é, com a dica, na função clue
      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = null);

      //inicio o loading da pagina
      this.loading = true;
      //chamo a função para carregar os personagens
      this.utils.loadImageHero();

      setTimeout(()=>{    //<<<---    using ()=> syntax
        this.loading = false;
      }, 3000);
    }    

    //aqui eu fiz uma função que chamo no html, para atualizar toda vez o nome do personagem
    returnNameHero(){
      return this.nameHero = localStorage.getItem('nameHero');      
    }
    //aqui eu fiz uma função que chamo ho html, para atualizar toda vez a imagem do personagem
    returnImageHero(){
      return this.imageHero = localStorage.getItem('imageHero');
    }
    //aqui eu faço o alert de dica para o usuario de qual personagem é, aparecento no canto direito superior da tela
    helpAnswer(){
      this._success.next(`The character's name is - ${this.returnNameHero()}`);
      this.help = 'true';
      localStorage.setItem('help', this.help);
    }
}
