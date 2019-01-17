import { TestBed, inject } from '@angular/core/testing';

import { PhilipsHueService } from './philips-hue.service';

describe('PhilipsHueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhilipsHueService]
    });
  });

  it('should be created', inject([PhilipsHueService], (service: PhilipsHueService) => {
    expect(service).toBeTruthy();
  }));
});
