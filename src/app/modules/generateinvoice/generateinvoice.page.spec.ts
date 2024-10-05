import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateinvoicePage } from './generateinvoice.page';

describe('GenerateinvoicePage', () => {
  let component: GenerateinvoicePage;
  let fixture: ComponentFixture<GenerateinvoicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateinvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
