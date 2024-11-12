import { TestBed } from '@angular/core/testing';

import { FilesTransferService } from './files-transfer.service';

describe('FilesTransferService', () => {
  let service: FilesTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
