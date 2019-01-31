import { TestBed, inject } from '@angular/core/testing';

import { NetatmoService } from './netatmo.service';

describe('NetatmoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetatmoService]
    });
  });

  it('should be created', inject([NetatmoService], (service: NetatmoService) => {
    expect(service).toBeTruthy();
  }));
});
