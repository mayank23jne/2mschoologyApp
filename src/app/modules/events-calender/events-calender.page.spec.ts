import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsCalenderPage } from './events-calender.page';

describe('EventsCalenderPage', () => {
  let component: EventsCalenderPage;
  let fixture: ComponentFixture<EventsCalenderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsCalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
