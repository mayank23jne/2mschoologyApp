import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceReportPage } from './attendance-report.page';

describe('AttendanceReportPage', () => {
  let component: AttendanceReportPage;
  let fixture: ComponentFixture<AttendanceReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
