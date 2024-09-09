import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMarksPage } from './update-marks.page';

describe('UpdateMarksPage', () => {
  let component: UpdateMarksPage;
  let fixture: ComponentFixture<UpdateMarksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMarksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
