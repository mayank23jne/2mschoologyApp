import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressReportPage } from './progress-report.page';

describe('ProgressReportPage', () => {
  let component: ProgressReportPage;
  let fixture: ComponentFixture<ProgressReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
