import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListPageComponent } from './EventListPage.component';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";

describe('EventListPageComponent', () => {
  let component: EventListPageComponent;
  let fixture: ComponentFixture<EventListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListPageComponent],
      providers: [
        provideAnimations(),
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
