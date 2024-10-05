import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateClientPage } from './create-client.page';

describe('CreateClientPage', () => {
  let component: CreateClientPage;
  let fixture: ComponentFixture<CreateClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
