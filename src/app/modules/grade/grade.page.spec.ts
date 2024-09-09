import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradePage } from './grade.page';

describe('GradePage', () => {
  let component: GradePage;
  let fixture: ComponentFixture<GradePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
