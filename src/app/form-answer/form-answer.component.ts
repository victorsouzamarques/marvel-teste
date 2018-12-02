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
    
   

    this.formAnswer = this.formBuilder.group({
      reply: ['', Validators.required]
    });
  }

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

  clearInput(){
    this.formAnswer = this.formBuilder.group({
      reply: ['', Validators.required]
    });
  }

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
