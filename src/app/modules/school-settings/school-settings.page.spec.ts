import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolSettingsPage } from './school-settings.page';

describe('SchoolSettingsPage', () => {
  let component: SchoolSettingsPage;
  let fixture: ComponentFixture<SchoolSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
