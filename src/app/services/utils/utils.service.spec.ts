import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from '../hero/hero.service';

describe('UtilsService', () => {
  let service: UtilsService;
  let image;
  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [],
        providers: [UtilsService, HeroService],  // all all services upon which AuthService depends
        imports: [HttpClientTestingModule], 
    });
  });
  
  //Start test image not be null, aqui eu verifico se ah alguma possibilidade de a imagem retornar null, garantindo que sempre havera um personagem sendo retornado
  beforeEach(() => {
    service = TestBed.get(UtilsService);
    image = null;
  });

  afterEach(() => {
    image = service.imageHero;
  });

  it("should image not be null", () => {
    expect(service.imageHero).not.toBe(null);
  })
  //End test image not be null
  
  it('should be created', () => {
    service = TestBed.get(UtilsService);
    expect(service).toBeTruthy();
  });
});
