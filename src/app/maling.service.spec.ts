import { TestBed } from '@angular/core/testing';

import { MalingService } from './maling.service';

describe('MalingService', () => {
  let service: MalingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MalingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
