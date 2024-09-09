import { TestBed } from '@angular/core/testing';

import { SchoolDataService } from './school-data.service';

describe('SchoolDataService', () => {
  let service: SchoolDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
