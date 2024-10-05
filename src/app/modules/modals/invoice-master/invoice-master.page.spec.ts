import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceMasterPage } from './invoice-master.page';

describe('InvoiceMasterPage', () => {
  let component: InvoiceMasterPage;
  let fixture: ComponentFixture<InvoiceMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
