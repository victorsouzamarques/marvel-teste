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


  it('#getHeros should return a observable', () => {
    expect(service.loadHero()).not.toBe(null);
  });
});
