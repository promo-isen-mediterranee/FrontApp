import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryChecklistForEventComponent } from './InventoryChecklistForEvent.component';

describe('InventoryChecklistForEventComponent', () => {
  let component: InventoryChecklistForEventComponent;
  let fixture: ComponentFixture<InventoryChecklistForEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryChecklistForEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryChecklistForEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
