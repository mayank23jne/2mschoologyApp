import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanStripePaymentPage } from './plan-stripe-payment.page';

describe('PlanStripePaymentPage', () => {
  let component: PlanStripePaymentPage;
  let fixture: ComponentFixture<PlanStripePaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanStripePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
