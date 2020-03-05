import { TestBed, inject } from '@angular/core/testing';

import { SigService } from './api.service';

describe('SigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SigService]
    });
  });

  it('should be created', inject([SigService], (service: SigService) => {
    expect(service).toBeTruthy();
  }));
});
