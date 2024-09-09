import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakePaymentPage } from './make-payment.page';

describe('MakePaymentPage', () => {
  let component: MakePaymentPage;
  let fixture: ComponentFixture<MakePaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
