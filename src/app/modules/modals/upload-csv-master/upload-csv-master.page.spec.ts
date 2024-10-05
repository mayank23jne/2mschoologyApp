import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadCsvMasterPage } from './upload-csv-master.page';

describe('UploadCsvMasterPage', () => {
  let component: UploadCsvMasterPage;
  let fixture: ComponentFixture<UploadCsvMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCsvMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
