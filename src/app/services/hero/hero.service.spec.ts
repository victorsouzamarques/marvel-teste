import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroService', () => {
  let service: HeroService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [],
        providers: [HeroService],  // all all services upon which AuthService depends
        imports: [HttpClientTestingModule], 
    });
  });

  beforeEach(() => {
    service = TestBed.get(HeroService);
  });

  //aqui eu gartanto que a função loadhero do heroservice não ira retornar null, caso ao contrario dara erro, caso mude o teste para .toBe(mull) retornara erro
  it('#getHeros should return a observable', () => {
    expect(service.loadHero()).not.toBe(null);
  });
});
