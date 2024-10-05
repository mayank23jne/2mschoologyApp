import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JointInvoiceMasterPage } from './joint-invoice-master.page';

describe('JointInvoiceMasterPage', () => {
  let component: JointInvoiceMasterPage;
  let fixture: ComponentFixture<JointInvoiceMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JointInvoiceMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
