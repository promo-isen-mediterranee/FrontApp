import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocationFormPageComponent } from './UpdateLocationFormPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('UpdateLocationFormPageComponent', () => {
  let component: UpdateLocationFormPageComponent;
  let fixture: ComponentFixture<UpdateLocationFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLocationFormPageComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateLocationFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
