import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMasterPage } from './admin-master.page';

describe('AdminMasterPage', () => {
  let component: AdminMasterPage;
  let fixture: ComponentFixture<AdminMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
