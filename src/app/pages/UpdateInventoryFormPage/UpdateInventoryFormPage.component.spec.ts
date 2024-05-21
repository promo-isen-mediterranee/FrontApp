import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryFormPageComponent } from './UpdateInventoryFormPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

describe('UpdateInventoryFormPageComponent', () => {
  let component: UpdateInventoryFormPageComponent;
  let fixture: ComponentFixture<UpdateInventoryFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInventoryFormPageComponent],
      providers: [provideAnimations(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateInventoryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
