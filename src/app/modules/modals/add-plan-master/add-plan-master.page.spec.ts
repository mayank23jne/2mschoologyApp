import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlanMasterPage } from './add-plan-master.page';

describe('AddPlanMasterPage', () => {
  let component: AddPlanMasterPage;
  let fixture: ComponentFixture<AddPlanMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
