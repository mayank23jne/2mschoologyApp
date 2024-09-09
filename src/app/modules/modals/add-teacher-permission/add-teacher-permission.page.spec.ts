import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTeacherPermissionPage } from './add-teacher-permission.page';

describe('AddTeacherPermissionPage', () => {
  let component: AddTeacherPermissionPage;
  let fixture: ComponentFixture<AddTeacherPermissionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherPermissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
