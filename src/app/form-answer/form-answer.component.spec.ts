import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnswerComponent } from './form-answer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroService } from '../services/hero/hero.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
describe('FormAnswerComponent', () => {
  let component: FormAnswerComponent;
  let fixture: ComponentFixture<FormAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnswerComponent ],
      providers: [HeroService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        NgxLoadingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
