import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExamMasterPage } from './add-exam-master.page';

describe('AddExamMasterPage', () => {
  let component: AddExamMasterPage;
  let fixture: ComponentFixture<AddExamMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExamMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
