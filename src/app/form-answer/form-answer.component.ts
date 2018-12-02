import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.sass']
})
export class FormAnswerComponent implements OnInit {

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;
  public formAnswer: FormGroup;
  points: number = 0;
  reply: any;
  //utilização dos modulos do @angular/core input e output, para passar variaveis para outro component
  @Input() pointsRecive;
  @Output() pointsSend = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private utils: UtilsService) {}
  public loading = false;

  ngOnInit() {
    
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime  (5000)
    ).subscribe(() => this.successMessage = null);
    
   
    //utilização do formbuilder, para criação do formulario e também validação de campos, não permitindo que o usuario envie uma resposta sem ter preenchido pelo menos um digito do campo de reply
    this.formAnswer = this.formBuilder.group({
      reply: ['', Validators.required]
    });
  }

  //aqui é a função que faz a logica de pontos após resposta, separei em todas as possibilidades de um usuario digitar algo, com resposta para cada situação e não permitindo ele ficar com pontos negativos
  answerQuestion(){
    
    this.loading = true;

    if(this.points < 1){
      console.log("entrou");
      if((localStorage.getItem('nameHero') == this.formAnswer.value.reply) && (localStorage.getItem('help') == "false")){
        this.points = this.points + 1;
        this.successMessage = "Nice! You deserved this point.";
      } else if((localStorage.getItem('nameHero') == this.formAnswer.value.reply) && (localStorage.getItem('help') == "true")){
        this.successMessage = "You did not score points because you asked for help.";
      } else {
        this.successMessage = "Shame on you!";
      }
      } else {
      if((localStorage.getItem('nameHero') == this.formAnswer.value.reply) && (localStorage.getItem('help') == "false")){
        this.points = this.points + 1;
        this.successMessage = "Nice! You deserved this point.";
      } else if((localStorage.getItem('nameHero') == this.formAnswer.value.reply) && (localStorage.getItem('help') == "true")) {
        this.successMessage = "You did not score points because you asked for help.";
      } else {
        this.points = this.points - 1;
        this.successMessage = "Shame on you!";
      }
    }
    
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loading = false;
    }, 3000);

    this._success.next(`${this.successMessage}`);
    localStorage.setItem('help', "false");
    this.pointsSend.emit({"points": this.points});
    this.utils.loadImageHero();
    this.clearInput();
  }

  //função para limpar os campos do formulario, para cada resposta
  clearInput(){
    this.formAnswer = this.formBuilder.group({
      reply: ['', Validators.required]
    });
  }
  
  //como nem todos personagens tem imagem, foi implementado a função de next, para pular os personagens que não possuem imagem
  next(){
    this.loading = true;
    
    this.utils.loadImageHero();
    this.clearInput();
    localStorage.setItem('help', "false");

    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.loading = false;
    }, 3000);
  }
}
