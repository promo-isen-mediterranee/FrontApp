import { Component, Input } from "@angular/core";

export interface Event {
  title: string;
  date_start: string;
  date_end: string;
  location: string;
  status: string;
}

@Component({
  selector: 'app-calendar-event-box',
  standalone: true,
  imports: [],
  templateUrl: './calendarEventBox.component.html',
  styleUrl: './calendareventBox.component.css'
})
export class CalendarEventBoxComponent {

  @Input()
  protected event: Event = {} as Event;

}
