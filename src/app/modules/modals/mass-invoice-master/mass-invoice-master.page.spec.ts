import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MassInvoiceMasterPage } from './mass-invoice-master.page';

describe('MassInvoiceMasterPage', () => {
  let component: MassInvoiceMasterPage;
  let fixture: ComponentFixture<MassInvoiceMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MassInvoiceMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
