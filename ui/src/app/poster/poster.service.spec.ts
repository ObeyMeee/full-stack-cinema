import { TestBed } from '@angular/core/testing';

import { PosterService } from './poster.service';

describe('PosterService', () => {
  let service: PosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
