import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserFormPageComponent } from './AddUserFormPage.component';

describe('AddUserFormPageComponent', () => {
  let component: AddUserFormPageComponent;
  let fixture: ComponentFixture<AddUserFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
