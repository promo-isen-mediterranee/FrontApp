import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPageComponent } from './SuccessPage.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('SucessPageComponent', () => {
  let component: SuccessPageComponent;
  let fixture: ComponentFixture<SuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessPageComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
