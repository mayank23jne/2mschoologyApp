import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentExcelPage } from './student-excel.page';

describe('StudentExcelPage', () => {
  let component: StudentExcelPage;
  let fixture: ComponentFixture<StudentExcelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExcelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
