import { TestBed } from '@angular/core/testing';

import { ProviderScheduleService } from './provider-schedule.service';

describe('ProviderScheduleService', () => {
  let service: ProviderScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
