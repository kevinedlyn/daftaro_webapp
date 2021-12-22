import { TestBed } from '@angular/core/testing';

import { PractitionersService } from './practitioners.service';

describe('PractitionersService', () => {
  let service: PractitionersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractitionersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
