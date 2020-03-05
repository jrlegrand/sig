import { TestBed, inject } from '@angular/core/testing';

import { NormalizeService } from './normalize.service';

describe('NormalizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NormalizeService]
    });
  });

  it('should be created', inject([NormalizeService], (service: NormalizeService) => {
    expect(service).toBeTruthy();
  }));
});
