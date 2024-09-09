import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceInfoPage } from './invoice-info.page';

describe('InvoiceInfoPage', () => {
  let component: InvoiceInfoPage;
  let fixture: ComponentFixture<InvoiceInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
