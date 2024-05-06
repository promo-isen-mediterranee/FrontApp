import { Component } from '@angular/core';
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { ButtonComponent } from "../../components/button/button.component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-event-list-page',
  standalone: true,
  imports: [
    CalendarComponent,
    ButtonComponent,
    NgIf
  ],
  templateUrl: './EventListPage.component.html',
  styleUrl: './EventListPage.component.css'
})
export class EventListPageComponent {
  protected currentView: string = 'calendar';

  public changeView(view: string) {
    this.currentView = view;
  }
}
