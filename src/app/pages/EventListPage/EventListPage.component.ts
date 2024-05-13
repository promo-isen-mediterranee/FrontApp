import { Component } from '@angular/core';
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { ButtonComponent } from "../../components/button/button.component";
import { NgIf } from "@angular/common";
import { EventSourceInput } from "@fullcalendar/core";
import { ToggleComponent } from "../../components/toggle/toggle.component";

@Component({
  selector: 'app-event-list-page',
  standalone: true,
  imports: [
    CalendarComponent,
    ButtonComponent,
    NgIf,
    ToggleComponent
  ],
  templateUrl: './EventListPage.component.html',
  styleUrl: './EventListPage.component.css'
})
export class EventListPageComponent {
  public events: EventSourceInput = [
    { title: 'event 1', start: new Date(2024, 5, 7), end: new Date(2024, 5, 10), extendedProps: {location: 'Paris', status: 'confirmed'} },
    { title: 'event 2', start: new Date(2024, 5, 8, 9), end: new Date(2024, 5, 8, 16), location: 'Palais Neptune,' +
        ' Toulon', status: 'confirmed' }
  ];
}
