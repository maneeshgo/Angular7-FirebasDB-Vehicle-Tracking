import { TestBed, inject } from '@angular/core/testing';
import { CVSHttpInterceptor } from './cvs-http-interceptor.service';

describe('HttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CVSHttpInterceptor]
    });
  });

  it('should be created', inject([CVSHttpInterceptor], (service: CVSHttpInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
