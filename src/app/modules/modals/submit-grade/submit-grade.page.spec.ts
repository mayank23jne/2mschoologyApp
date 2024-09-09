import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitGradePage } from './submit-grade.page';

describe('SubmitGradePage', () => {
  let component: SubmitGradePage;
  let fixture: ComponentFixture<SubmitGradePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitGradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
