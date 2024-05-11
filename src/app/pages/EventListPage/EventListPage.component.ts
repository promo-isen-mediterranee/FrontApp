import { Component } from '@angular/core';
import { CalendarComponent, EventInterface } from "../../components/calendar/calendar.component";
import { ButtonComponent } from "../../components/button/button.component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-event-list-page',
  standalone: true,
  imports: [
    CalendarComponent,
    ButtonComponent,
    NgIf,
  ],
  templateUrl: './EventListPage.component.html',
  styleUrl: './EventListPage.component.css'
})
export class EventListPageComponent {
  protected currentView: string = 'calendar';

  public event : EventInterface = {
    title: "Test",
    date_start: new Date(2024, 6, 10),
    date_end: new Date(2024, 6, 12),
    location: "Paris",
    status: "En cours"
  }

  public changeView(view: string) {
    this.currentView = view;
  }
}
