import { TestBed } from '@angular/core/testing';

import { HttpJwtInterceptorService } from './http-jwt-interceptor.service';

describe('HttpJwtInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpJwtInterceptorService = TestBed.get(HttpJwtInterceptorService);
    expect(service).toBeTruthy();
  });
});
