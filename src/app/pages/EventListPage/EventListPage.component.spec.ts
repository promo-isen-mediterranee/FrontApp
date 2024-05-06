import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListPageComponent } from './EventListPage.component';

describe('EventListPageComponent', () => {
  let component: EventListPageComponent;
  let fixture: ComponentFixture<EventListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListPageComponent]
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
