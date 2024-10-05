import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubInvoicesPage } from './sub-invoices.page';

describe('SubInvoicesPage', () => {
  let component: SubInvoicesPage;
  let fixture: ComponentFixture<SubInvoicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubInvoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
