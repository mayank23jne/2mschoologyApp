import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAssignmentPage } from './view-assignment.page';

describe('ViewAssignmentPage', () => {
  let component: ViewAssignmentPage;
  let fixture: ComponentFixture<ViewAssignmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
