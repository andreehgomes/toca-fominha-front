import { TestBed } from '@angular/core/testing';

import { NewPasswordDataService } from './new-password-data.service';

describe('NewPasswordDataService', () => {
  let service: NewPasswordDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPasswordDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
