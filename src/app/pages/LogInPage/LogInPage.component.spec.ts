import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInPageComponent } from './LogInPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LogInPageComponent', () => {
  let component: LogInPageComponent;
  let fixture: ComponentFixture<LogInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInPageComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LogInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
