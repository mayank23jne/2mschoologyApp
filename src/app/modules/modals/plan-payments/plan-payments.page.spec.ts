import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanPaymentsPage } from './plan-payments.page';

describe('PlanPaymentsPage', () => {
  let component: PlanPaymentsPage;
  let fixture: ComponentFixture<PlanPaymentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
