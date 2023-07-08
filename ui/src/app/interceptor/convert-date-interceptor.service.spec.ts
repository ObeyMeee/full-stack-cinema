import { TestBed } from '@angular/core/testing';

import { ConvertDateInterceptorService } from './convert-date-interceptor.service';

describe('ConvertDateInterceptorService', () => {
  let service: ConvertDateInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertDateInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
