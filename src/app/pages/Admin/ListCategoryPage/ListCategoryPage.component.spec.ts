import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryPageComponent } from './ListCategoryPage.component';
import { provideHttpClient } from '@angular/common/http';

describe('ListCategoryPageComponent', () => {
  let component: ListCategoryPageComponent;
  let fixture: ComponentFixture<ListCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCategoryPageComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
