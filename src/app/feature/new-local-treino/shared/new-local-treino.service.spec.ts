import { TestBed } from '@angular/core/testing';

import { NewLocalTreinoService } from './new-local-treino.service';

describe('NewLocalTreinoService', () => {
  let service: NewLocalTreinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewLocalTreinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
