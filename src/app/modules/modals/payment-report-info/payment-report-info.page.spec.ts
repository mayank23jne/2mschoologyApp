import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentReportInfoPage } from './payment-report-info.page';

describe('PaymentReportInfoPage', () => {
  let component: PaymentReportInfoPage;
  let fixture: ComponentFixture<PaymentReportInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReportInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
