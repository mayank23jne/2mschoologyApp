import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebsiteSettingsPage } from './website-settings.page';

describe('WebsiteSettingsPage', () => {
  let component: WebsiteSettingsPage;
  let fixture: ComponentFixture<WebsiteSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
