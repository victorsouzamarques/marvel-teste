import { Injectable } from '@angular/core';
import { HeroService } from '../hero/hero.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  //Foi cirado esse service para funções que podem ser utilizadas em mais de um componente, para não ficar repetindo codigo
  imageHero: string;
  nameHero: string;
  clueHero: String;
  heroList: any = [];
  pointsTotal: Number;
  help: string;
  //utilização de uma funcionalidade de loading no projeto, para indicar para o usuario que está carregando a imagem, e ele não atravessar as funcionalidades do sistema
  public loading = false;
  //constructor trazendo o Heroservice e instanciando em uma variavel privada, para ser utiliada por esse service.
  constructor(private heroService: HeroService) { }

  //essa função faz o subcribe no heroservice, e eu pego 100 personagens (que é o limite da api), e uso uma ferramenta chamada Math.random para deixar aleatorio o personagem que ira aparecer
  loadImageHero(){
    
    this.loading = true;
    let imageSize = "/standard_fantastic.";
    let number = Math.floor(Math.random() * 100) + 0;
    //utilização do subscribe retornando um observable, onde irei armazenar o retorno da função que puxa dados da api
    this.heroService.loadHero().subscribe(data => {

      this.heroList = data.data;

      //aqui vemos mais uma vez a utilização do localstorage, mas agora com JSON.stringify, para poder armazenar um objeto
      localStorage.setItem('heroes', JSON.stringify(this.heroList));
      // para pegar a imagem do personagem é preciso passar o path + a image size que seria pre setado pelo desenvolvedor + a extension da imagem sempre utilizando o let do javascript
      this.imageHero = data.data.results[number].thumbnail.path + imageSize + data.data.results[number].thumbnail.extension;
      this.nameHero = data.data.results[number].name;
      localStorage.setItem('nameHero', this.nameHero);
      localStorage.setItem('imageHero', this.imageHero);
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    }); 

  }
}
