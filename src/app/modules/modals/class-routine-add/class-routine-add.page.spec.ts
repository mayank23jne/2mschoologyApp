import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassRoutineAddPage } from './class-routine-add.page';

describe('ClassRoutineAddPage', () => {
  let component: ClassRoutineAddPage;
  let fixture: ComponentFixture<ClassRoutineAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRoutineAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
