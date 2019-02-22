import { TestBed, inject } from '@angular/core/testing';

import { GoogleCastService } from './google-cast.service';

describe('GoogleCastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleCastService]
    });
  });

  it('should be created', inject([GoogleCastService], (service: GoogleCastService) => {
    expect(service).toBeTruthy();
  }));
});
