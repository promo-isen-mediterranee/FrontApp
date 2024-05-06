import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarEventBoxComponent } from "./calendarEventBox.component";

describe('CalendarEventBoxComponent', () => {
  let component: CalendarEventBoxComponent;
  let fixture: ComponentFixture<CalendarEventBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
