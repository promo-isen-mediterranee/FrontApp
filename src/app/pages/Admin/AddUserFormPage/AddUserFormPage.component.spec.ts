import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserFormPageComponent } from './AddUserFormPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";

describe('AddUserFormPageComponent', () => {
  let component: AddUserFormPageComponent;
  let fixture: ComponentFixture<AddUserFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserFormPageComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
