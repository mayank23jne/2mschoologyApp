import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintReportPage } from './print-report.page';

describe('PrintReportPage', () => {
  let component: PrintReportPage;
  let fixture: ComponentFixture<PrintReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
