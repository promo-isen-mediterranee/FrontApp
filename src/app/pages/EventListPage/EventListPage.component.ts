import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NgIf } from '@angular/common';
import { ToggleComponent } from '../../components/toggle/toggle.component';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Event } from "../../interfaces/Event";

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
  private apiUrl = environment.apiEventUrl;

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
        contact_objective: event.contact_objective,
        item_manager: {
          id: event.item_manager.id,
          last_name: event.item_manager.last_name,
          first_name: event.item_manager.first_name,
        },
        location: {
          address: event.location.address,
          city: event.location.city,
          id: event.location.id,
          room: event.location.room,
        },
        stand_size: event.stand_size,
        status: event.status.label,
      },
    }));
  }
}
