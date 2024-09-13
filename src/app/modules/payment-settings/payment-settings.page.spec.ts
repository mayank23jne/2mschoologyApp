import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentSettingsPage } from './payment-settings.page';

describe('PaymentSettingsPage', () => {
  let component: PaymentSettingsPage;
  let fixture: ComponentFixture<PaymentSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
