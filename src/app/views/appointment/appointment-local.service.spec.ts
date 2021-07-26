import { TestBed } from '@angular/core/testing';

import { AppointmentLocalService } from './appointment-local.service';

describe('AppointmentLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentLocalService = TestBed.get(AppointmentLocalService);
    expect(service).toBeTruthy();
  });
});
