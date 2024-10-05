import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExpenseCategoryPage } from './add-expense-category.page';

describe('AddExpenseCategoryPage', () => {
  let component: AddExpenseCategoryPage;
  let fixture: ComponentFixture<AddExpenseCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
