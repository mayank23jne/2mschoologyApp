import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassRoomPage } from './class-room.page';

describe('ClassRoomPage', () => {
  let component: ClassRoomPage;
  let fixture: ComponentFixture<ClassRoomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
