import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMasterPage } from './add-master.page';

describe('AddMasterPage', () => {
  let component: AddMasterPage;
  let fixture: ComponentFixture<AddMasterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
