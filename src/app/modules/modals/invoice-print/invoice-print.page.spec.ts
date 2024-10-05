import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoicePrintPage } from './invoice-print.page';

describe('InvoicePrintPage', () => {
  let component: InvoicePrintPage;
  let fixture: ComponentFixture<InvoicePrintPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePrintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
