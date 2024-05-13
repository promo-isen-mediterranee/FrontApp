import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { FullCalendarComponent, FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOptions, EventClickArg, EventSourceInput } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { MatIcon } from "@angular/material/icon";
import { DatePipe } from "@angular/common";
import { MatFormField } from "@angular/material/form-field";
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { MatInput, MatLabel } from "@angular/material/input";
import { provideNativeDateAdapter } from "@angular/material/core";

export interface EventInterface {
  title: string,
  date_start: Date,
  date_end: Date,
  location: string,
  status: string
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    MatIcon,
    DatePipe,
    MatFormField,
    MatDatepicker,
    FormsModule,
    MatDatepickerInput,
    MatInput,
    MatLabel
  ],
  providers: [
    MatDatepickerModule,
    provideNativeDateAdapter()
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

  protected selectedEvent: EventInterface = {} as EventInterface;

  @Input()
  public events: EventSourceInput = [];

  public x: number = 0;
  public y: number = 0;

  @HostListener('window:resize', ['$event']) onResize(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.view()
  }

  private view(): void {
    if(this.screenWidth <= 425) {
      this.calendarView = 'listWeek';
    } else {
      this.calendarView = 'dayGridMonth';
    }
    this.calendarComponent.getApi().changeView(this.calendarView);
  }

  public calendarOptions : CalendarOptions = {
    contentHeight: "auto",
    eventClick: this.handleEventClick.bind(this),
    handleWindowResize: false,
    headerToolbar: {
      start: "title",
      center: "",
      end: "today prev,next dayGridMonth,timeGridWeek,timeGridDay,listWeek"
    },
    initialView: "dayGridMonth",
    locale: frLocale,
    plugins: [dayGridPlugin, listPlugin, timeGridPlugin],
    timeZone: "Europe/Paris"
  };

  ngAfterViewInit(): void {
    this.calendarOptions.events = this.events;
  }

  ngOnChanges(): void {
    this.calendarOptions.events = this.events;
  }

  public closeDialog(): void {
    let dialog = document.getElementById("dialog") as HTMLDialogElement;
    dialog.close();
  }

  public handleEventClick(clickedEvent: EventClickArg): void {
    clickedEvent.jsEvent.preventDefault();
    let coordinates = clickedEvent.el.getBoundingClientRect();
    this.selectedEvent = {title: clickedEvent.event.title, date_start: clickedEvent.event.start,
      date_end: clickedEvent.event.end, location: clickedEvent.event.extendedProps['location'],
      status: clickedEvent.event.extendedProps['status']} as EventInterface;
    let dialog = document.getElementById("dialog") as HTMLDialogElement;
    if(coordinates.left - 448 > 0) {
      this.x = coordinates.left - 448;
    } else {
      this.x = coordinates.right;
    }
    if (this.screenHeight - coordinates.top < 220) {
      this.y = coordinates.top - 220;
    } else {
      this.y = coordinates.top;
    }
    dialog.style.left = this.x + "px";
    dialog.style.top = this.y + "px";
    dialog.show();
  }
}
