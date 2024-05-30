import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryFormComponent } from './AddCategoryForm.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AddCategoryFormComponent', () => {
  let component: AddCategoryFormComponent;
  let fixture: ComponentFixture<AddCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryFormComponent],
      providers: [provideHttpClient(), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
