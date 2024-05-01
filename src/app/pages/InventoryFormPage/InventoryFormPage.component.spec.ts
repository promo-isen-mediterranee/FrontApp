import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryFormPageComponent } from './InventoryFormPage.component';

describe('InventoryFormPageComponent', () => {
  let component: InventoryFormPageComponent;
  let fixture: ComponentFixture<InventoryFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
