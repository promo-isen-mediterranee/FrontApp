import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryChecklistForEventComponent } from './InventoryChecklistForEvent.component';
import { provideHttpClient } from '@angular/common/http';

describe('InventoryChecklistForEventComponent', () => {
  let component: InventoryChecklistForEventComponent;
  let fixture: ComponentFixture<InventoryChecklistForEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryChecklistForEventComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryChecklistForEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
