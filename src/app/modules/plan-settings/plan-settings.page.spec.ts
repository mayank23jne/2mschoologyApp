import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanSettingsPage } from './plan-settings.page';

describe('PlanSettingsPage', () => {
  let component: PlanSettingsPage;
  let fixture: ComponentFixture<PlanSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
