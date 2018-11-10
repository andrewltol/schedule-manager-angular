import { TestBed, inject } from '@angular/core/testing';

import { HttpRestService } from './http-rest.service';

describe('HttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRestService]
    });
  });

  it('should be created', inject([HttpRestService], (service: HttpRestService) => {
    expect(service).toBeTruthy();
  }));
});
