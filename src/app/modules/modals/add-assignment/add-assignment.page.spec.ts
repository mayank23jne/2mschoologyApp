import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAssignmentPage } from './add-assignment.page';

describe('AddAssignmentPage', () => {
  let component: AddAssignmentPage;
  let fixture: ComponentFixture<AddAssignmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
