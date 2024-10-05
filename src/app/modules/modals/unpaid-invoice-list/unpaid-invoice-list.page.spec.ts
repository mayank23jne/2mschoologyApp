import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnpaidInvoiceListPage } from './unpaid-invoice-list.page';

describe('UnpaidInvoiceListPage', () => {
  let component: UnpaidInvoiceListPage;
  let fixture: ComponentFixture<UnpaidInvoiceListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidInvoiceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
