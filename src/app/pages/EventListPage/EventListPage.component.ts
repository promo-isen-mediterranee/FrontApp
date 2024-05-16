import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NgIf } from '@angular/common';
import { EventSourceInput } from '@fullcalendar/core';
import { ToggleComponent } from '../../components/toggle/toggle.component';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  Tabevents: Event[] = [];
  private apiUrl = environment.apiEventUrl;
  constructor(private http: HttpClient) {}
  public events: Event[] = [];

  ngOnInit() {
    this.http
      .get<Event[]>(this.apiUrl + 'getAll')
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
