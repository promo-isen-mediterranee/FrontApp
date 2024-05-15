import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NgIf } from '@angular/common';
import { ToggleComponent } from '../../components/toggle/toggle.component';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

interface Event {
  title: string;
  start: string;
  end: string;
  extendedProps?: {
    id?: number;
    contactObjective?: number;
    itemManager?: {
      id: string;
      name: string;
      surname: string;
    };
    location?: {
      address: string;
      city: string;
      id: number;
      room: string;
    };
    standSize?: number;
    status?: {
      id: number;
      label: string;
    };
  };
}

@Component({
  selector: 'app-event-list-page',
  standalone: true,
  imports: [CalendarComponent, ButtonComponent, NgIf, ToggleComponent],
  templateUrl: './EventListPage.component.html',
  styleUrl: './EventListPage.component.css',
})
export class EventListPageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public Tabevents: Event[] = [];
  public events: Event[] = [];

  ngOnInit() {
    this.http
      .get<Event[]>('http://localhost:5000/event/getAll')
      .pipe(
        tap((data) => {
          this.Tabevents = data;
          this.events = this.transformToEventSourceInput(this.Tabevents);
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        }),
      )
      .subscribe();
  }

  transformToEventSourceInput(events: any[]): Event[] {
    return events.map((event) => ({
      title: event.name,
      start: event.date_start,
      end: event.date_end,
      extendedProps: {
        id: event.id,
        contactObjective: event.contact_objective,
        itemManager: event.item_manager,
        location: event.location.city,
        standSize: event.stand_size,
        status: event.status.label,
      },
    }));
  }

}
