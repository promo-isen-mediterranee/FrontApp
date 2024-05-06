import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventFormPageComponent } from './UpdateEventFormPage.component';

describe('UpdateEventFormPageComponent', () => {
  let component: UpdateEventFormPageComponent;
  let fixture: ComponentFixture<UpdateEventFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEventFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEventFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
