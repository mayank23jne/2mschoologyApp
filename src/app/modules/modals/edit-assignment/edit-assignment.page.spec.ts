import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAssignmentPage } from './edit-assignment.page';

describe('EditAssignmentPage', () => {
  let component: EditAssignmentPage;
  let fixture: ComponentFixture<EditAssignmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
