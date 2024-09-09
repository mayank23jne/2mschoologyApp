import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountantPage } from './accountant.page';

describe('AccountantPage', () => {
  let component: AccountantPage;
  let fixture: ComponentFixture<AccountantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
