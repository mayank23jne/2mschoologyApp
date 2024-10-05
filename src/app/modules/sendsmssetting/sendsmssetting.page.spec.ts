import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendsmssettingPage } from './sendsmssetting.page';

describe('SendsmssettingPage', () => {
  let component: SendsmssettingPage;
  let fixture: ComponentFixture<SendsmssettingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsmssettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
