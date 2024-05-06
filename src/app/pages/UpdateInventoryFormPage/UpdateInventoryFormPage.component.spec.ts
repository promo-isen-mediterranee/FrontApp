import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryFormPageComponent } from './UpdateInventoryFormPage.component';

describe('InventoryFormPageComponent', () => {
  let component: UpdateInventoryFormPageComponent;
  let fixture: ComponentFixture<UpdateInventoryFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInventoryFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInventoryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
