import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryFormPageComponent } from './AddInventoryFormPage.component';

describe('AddInvetoryFormPageComponent', () => {
  let component: AddInventoryFormPageComponent;
  let fixture: ComponentFixture<AddInventoryFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInventoryFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInventoryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
