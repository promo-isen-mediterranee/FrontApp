import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryPageComponent } from './ListCategoryPage.component';

describe('ListCategoryPageComponent', () => {
  let component: ListCategoryPageComponent;
  let fixture: ComponentFixture<ListCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCategoryPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
