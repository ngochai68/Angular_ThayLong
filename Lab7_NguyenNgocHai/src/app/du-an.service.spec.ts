import { TestBed } from '@angular/core/testing';

import { DuAnService } from './du-an.service';

describe('DuAnService', () => {
  let service: DuAnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuAnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
