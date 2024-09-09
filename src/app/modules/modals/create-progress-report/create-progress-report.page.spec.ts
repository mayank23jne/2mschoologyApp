import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProgressReportPage } from './create-progress-report.page';

describe('CreateProgressReportPage', () => {
  let component: CreateProgressReportPage;
  let fixture: ComponentFixture<CreateProgressReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProgressReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
