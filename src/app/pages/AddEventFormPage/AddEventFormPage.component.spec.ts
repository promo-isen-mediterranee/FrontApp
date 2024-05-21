import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventFormPageComponent } from './AddEventFormPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

describe('AddEventFormPageComponent', () => {
  let component: AddEventFormPageComponent;
  let fixture: ComponentFixture<AddEventFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventFormPageComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
