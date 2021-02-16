import { TestBed } from '@angular/core/testing';

import { MedicineserviceService } from './medicineservice.service';

describe('MedicineserviceService', () => {
  let service: MedicineserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
