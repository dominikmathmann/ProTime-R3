import { TestBed } from '@angular/core/testing';

import { HttpDateInterceptorService } from './http-date-interceptor.service';

describe('HttpDateInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpDateInterceptorService = TestBed.get(HttpDateInterceptorService);
    expect(service).toBeTruthy();
  });
});
