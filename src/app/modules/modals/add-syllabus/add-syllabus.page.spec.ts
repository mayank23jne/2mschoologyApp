import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSyllabusPage } from './add-syllabus.page';

describe('AddSyllabusPage', () => {
  let component: AddSyllabusPage;
  let fixture: ComponentFixture<AddSyllabusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSyllabusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
