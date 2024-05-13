import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventFormPageComponent } from './AddEventFormPage.component';
import { provideAnimations } from "@angular/platform-browser/animations";

describe('AddEventFormPageComponent', () => {
  let component: AddEventFormPageComponent;
  let fixture: ComponentFixture<AddEventFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventFormPageComponent],
      providers: [
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEventFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
