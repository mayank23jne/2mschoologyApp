import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlinePaymentPage } from './online-payment.page';

describe('OnlinePaymentPage', () => {
  let component: OnlinePaymentPage;
  let fixture: ComponentFixture<OnlinePaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
