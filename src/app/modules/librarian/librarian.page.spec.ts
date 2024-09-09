import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrarianPage } from './librarian.page';

describe('LibrarianPage', () => {
  let component: LibrarianPage;
  let fixture: ComponentFixture<LibrarianPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
