import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolPermissionPage } from './school-permission.page';

describe('SchoolPermissionPage', () => {
  let component: SchoolPermissionPage;
  let fixture: ComponentFixture<SchoolPermissionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolPermissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
