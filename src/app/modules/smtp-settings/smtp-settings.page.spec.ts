import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmtpSettingsPage } from './smtp-settings.page';

describe('SmtpSettingsPage', () => {
  let component: SmtpSettingsPage;
  let fixture: ComponentFixture<SmtpSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
