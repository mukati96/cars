import { TestBed } from '@angular/core/testing';

import { GoogleGeocodeApiService } from './google-geocode-api.service';

describe('GoogleGeocodeApiService', () => {
  let service: GoogleGeocodeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleGeocodeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
