import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserPageComponent } from './UpdateUserPage.component';
import { provideHttpClient } from "@angular/common/http";

describe('UpdateUserPageComponent', () => {
  let component: UpdateUserPageComponent;
  let fixture: ComponentFixture<UpdateUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserPageComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
