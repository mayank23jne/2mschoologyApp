import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceChartPage } from './invoice-chart.page';

describe('InvoiceChartPage', () => {
  let component: InvoiceChartPage;
  let fixture: ComponentFixture<InvoiceChartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
