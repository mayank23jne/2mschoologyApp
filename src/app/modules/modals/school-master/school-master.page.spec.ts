import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolMasterPage } from './school-master.page';

describe('SchoolMasterPage', () => {
  let component: SchoolMasterPage;
  let fixture: ComponentFixture<SchoolMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
