import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromotionPage } from './promotion.page';

describe('PromotionPage', () => {
  let component: PromotionPage;
  let fixture: ComponentFixture<PromotionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
