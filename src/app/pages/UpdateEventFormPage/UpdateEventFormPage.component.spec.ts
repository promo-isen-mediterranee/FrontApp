import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventFormPageComponent } from './UpdateEventFormPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

describe('UpdateEventFormPageComponent', () => {
  let component: UpdateEventFormPageComponent;
  let fixture: ComponentFixture<UpdateEventFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventFormPageComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateEventFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
