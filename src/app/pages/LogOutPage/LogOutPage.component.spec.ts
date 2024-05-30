import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutPageComponent } from './LogOutPage.component';
import { provideHttpClient } from "@angular/common/http";

describe('LogoutComponent', () => {
  let component: LogOutPageComponent;
  let fixture: ComponentFixture<LogOutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogOutPageComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogOutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
