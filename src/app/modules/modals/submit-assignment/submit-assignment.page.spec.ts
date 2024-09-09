import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitAssignmentPage } from './submit-assignment.page';

describe('SubmitAssignmentPage', () => {
  let component: SubmitAssignmentPage;
  let fixture: ComponentFixture<SubmitAssignmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitAssignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
