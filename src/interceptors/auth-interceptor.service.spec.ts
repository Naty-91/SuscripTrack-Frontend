import { TestBed } from '@angular/core/testing';
import { authInterceptor } from './auth-interceptor.service';

describe('AuthInterceptorService', () => {
  let service:;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(authInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
