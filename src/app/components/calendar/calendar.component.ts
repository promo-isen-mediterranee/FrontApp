import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { FullCalendarComponent, FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @ViewChild("calendar")
  calendarComponent: FullCalendarComponent = new FullCalendarComponent({} as ElementRef, {} as ChangeDetectorRef);
  private calendarView: string = 'dayGridMonth'
  private screenHeight : number = 0;
  private screenWidth : number = 0;

  @HostListener('window:resize', ['$event']) onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.view()
  }

  private view() {
    if(this.screenWidth <= 425) {
      this.calendarView = 'listWeek';
    } else {
      this.calendarView = 'dayGridMonth';
    }
    this.calendarComponent.getApi().changeView(this.calendarView);
  }

  calendarOptions: CalendarOptions = {
    timeZone: 'Europe/Paris',
    initialView: 'dayGridMonth',
    contentHeight: 'auto',
    plugins: [dayGridPlugin, listPlugin],
    locale: frLocale,
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'today prev,next'
    },
    events: [
      { title: 'event 1', date: '2024-05-07' },
      { title: 'event 2', date: '2024-05-08' }
    ],
    handleWindowResize: false,
    eventClick: function(info) {
      info.jsEvent.preventDefault();
    }
  };
}
