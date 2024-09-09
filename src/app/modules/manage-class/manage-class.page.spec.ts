import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageClassPage } from './manage-class.page';

describe('ManageClassPage', () => {
  let component: ManageClassPage;
  let fixture: ComponentFixture<ManageClassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
