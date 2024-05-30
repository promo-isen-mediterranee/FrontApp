import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryFormPageComponent } from './UpdateInventoryFormPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { Navigation, Router } from '@angular/router';

describe('UpdateInventoryFormPageComponent', () => {
  let component: UpdateInventoryFormPageComponent;
  let fixture: ComponentFixture<UpdateInventoryFormPageComponent>;

  const router = TestBed.inject(Router);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInventoryFormPageComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        {
          provide: Router,
          useValue: {
            getCurrentNavigation: () => mockNavigation,
          },
        },
      ],
    }).compileComponents();

    const mockNavigation: Navigation = {
      extractedUrl: router.parseUrl(''),
      initialUrl: router.parseUrl(''),
      previousNavigation: null,
      id: 1,
      trigger: 'imperative',
      extras: {
        state: {
          selectedItem: {
            item_id: {
              id: 1,
              name: 'Item Name',
              category_id: {
                label: 'Category Name',
              },
            },
            location_id: {
              id: 1,
              room: 'Room Name',
            },
            quantity: 10,
          },
        },
      },
    };

    fixture = TestBed.createComponent(UpdateInventoryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
