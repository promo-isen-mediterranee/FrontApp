import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleFormPageComponent } from './AddRoleFormPage.component';

describe('AddRoleFormPageComponent', () => {
  let component: AddRoleFormPageComponent;
  let fixture: ComponentFixture<AddRoleFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoleFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoleFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
