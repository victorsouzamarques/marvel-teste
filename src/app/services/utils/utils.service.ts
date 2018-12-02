import { Injectable } from '@angular/core';
import { HeroService } from '../hero/hero.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
    
  imageHero: string;
  nameHero: string;
  clueHero: String;
  heroList: any = [];
  pointsTotal: Number;
  help: string;
  public loading = false;
  constructor(private heroService: HeroService) { }

  loadImageHero(){
    this.loading = true;
    let imageSize = "/standard_fantastic.";
    let number = Math.floor(Math.random() * 100) + 0;
    this.heroService.loadHero().subscribe(data => {
    this.heroList = data.data;

    localStorage.setItem('heroes', JSON.stringify(this.heroList));
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
