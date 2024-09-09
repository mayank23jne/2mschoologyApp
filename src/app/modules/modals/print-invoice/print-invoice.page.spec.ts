import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintInvoicePage } from './print-invoice.page';

describe('PrintInvoicePage', () => {
  let component: PrintInvoicePage;
  let fixture: ComponentFixture<PrintInvoicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
