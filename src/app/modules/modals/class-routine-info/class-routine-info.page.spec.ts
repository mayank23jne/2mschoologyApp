import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassRoutineInfoPage } from './class-routine-info.page';

describe('ClassRoutineInfoPage', () => {
  let component: ClassRoutineInfoPage;
  let fixture: ComponentFixture<ClassRoutineInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRoutineInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
