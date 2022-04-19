import { TestBed } from '@angular/core/testing';

import { ErasmusService } from './erasmus.service';

describe('ErasmusService', () => {
  let service: ErasmusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErasmusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
