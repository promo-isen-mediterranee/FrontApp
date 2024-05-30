import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertListPageComponent } from './AlertListPage.component';
import { provideHttpClient } from "@angular/common/http";

describe('AlertListPageComponent', () => {
  let component: AlertListPageComponent;
  let fixture: ComponentFixture<AlertListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertListPageComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
