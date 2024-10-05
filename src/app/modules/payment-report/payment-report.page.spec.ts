import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentReportPage } from './payment-report.page';

describe('PaymentReportPage', () => {
  let component: PaymentReportPage;
  let fixture: ComponentFixture<PaymentReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
