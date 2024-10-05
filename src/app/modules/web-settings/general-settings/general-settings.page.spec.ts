import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralSettingsPage } from './general-settings.page';

describe('GeneralSettingsPage', () => {
  let component: GeneralSettingsPage;
  let fixture: ComponentFixture<GeneralSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
