import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProgressReportPage } from './edit-progress-report.page';

describe('EditProgressReportPage', () => {
  let component: EditProgressReportPage;
  let fixture: ComponentFixture<EditProgressReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgressReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
