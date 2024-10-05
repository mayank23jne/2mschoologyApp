import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseCategoryPage } from './expense-category.page';

describe('ExpenseCategoryPage', () => {
  let component: ExpenseCategoryPage;
  let fixture: ComponentFixture<ExpenseCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
