import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationFormPageComponent } from './AddLocationFormPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

describe('AddLocationFormPageComponent', () => {
  let component: AddLocationFormPageComponent;
  let fixture: ComponentFixture<AddLocationFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLocationFormPageComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLocationFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
