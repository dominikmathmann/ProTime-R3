import { TestBed } from '@angular/core/testing';

import { HttpJwtInterceptorService } from './http-jwt-interceptor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpJwtInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: HttpJwtInterceptorService = TestBed.get(HttpJwtInterceptorService);
    expect(service).toBeTruthy();
  });
});
