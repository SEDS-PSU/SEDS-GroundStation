import { TestBed } from '@angular/core/testing';

import { RandomDataService } from './random-data.service';

describe('RandomDataService', () => {
  let service: RandomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
