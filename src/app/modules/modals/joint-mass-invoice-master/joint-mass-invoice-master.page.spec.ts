import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JointMassInvoiceMasterPage } from './joint-mass-invoice-master.page';

describe('JointMassInvoiceMasterPage', () => {
  let component: JointMassInvoiceMasterPage;
  let fixture: ComponentFixture<JointMassInvoiceMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JointMassInvoiceMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
