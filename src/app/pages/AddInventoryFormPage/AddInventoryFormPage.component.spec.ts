import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryFormPageComponent } from './AddInventoryFormPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

describe('AddInventoryFormPageComponent', () => {
  let component: AddInventoryFormPageComponent;
  let fixture: ComponentFixture<AddInventoryFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInventoryFormPageComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddInventoryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
