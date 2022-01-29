import { TestBed } from '@angular/core/testing';

import { CommTestService } from './comm-test.service';

describe('CommTestService', () => {
  let service: CommTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
