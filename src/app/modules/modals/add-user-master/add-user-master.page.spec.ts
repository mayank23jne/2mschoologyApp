import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserMasterPage } from './add-user-master.page';

describe('AddUserMasterPage', () => {
  let component: AddUserMasterPage;
  let fixture: ComponentFixture<AddUserMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
