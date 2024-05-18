import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from '../../components/select/select.component';
import {
  MatFormField,
  MatHint,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Location {
  id: number;
  address: string;
  city: string;
  room?: string;
}

export interface Status {
  id: number;
  label: string;
}

@Component({
  selector: 'app-update-event-form-page',
  standalone: true,
  imports: [
    HttpClientModule,
    ButtonComponent,
    SelectComponent,
    CommonModule,
    MatInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    MatLabel,
    MatFormField,
    MatAutocomplete,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatError,
    AsyncPipe,
  ],
  providers: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    provideAnimations(),
  ],
  templateUrl: './UpdateEventFormPage.component.html',
  styleUrl: './UpdateEventFormPage.component.css',
})
export class UpdateEventFormPageComponent implements OnInit {
  selectedEvent: any = {};
  updateError = false;

  private apiUrl = environment.apiEventUrl;
  protected optionsL: Location[] = [];
  protected optionsS: Status[] = [];

  eventName: string = '';
  eventAddress: any;
  eventStatus: any;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedEvent = navigation.extras.state?.['selectedEvent'];
    }
  }

  displayFn(location: Location): string {
    return location ? `${location.address}, ${location.city}` : '';
  }

  displayS(status: Status): string {
    return status ? status.label : '';
  }

  getLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'location/getAll');
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'status/getAll');
  }

  onAddressSelected(option: any): void {
    this.eventAddress = option;
  }

  onStatusSelected(option: any): void {
    this.eventStatus = option;
  }

  ngOnInit(): void {
    this.getLocation().subscribe((data) => {
      for (const location of data) {
        const option: Location = {
          id: location.id,
          address: location.address,
          city: location.city,
          room: location.room,
        };
        const exists = this.optionsL.some(
          (opt) => opt.city === option.city && opt.address === option.address,
        );
        if (!exists) {
          this.optionsL.push(option);
        }
      }
    });
    this.getStatus().subscribe((data) => {
      for (const stat of data) {
        const option: Status = {
          id: stat.id,
          label: stat.label,
        };
        this.optionsS.push(option);
      }
    });
    this.eventStatus = this.selectedEvent.status;
    this.eventName = this.selectedEvent.title;
  }

  updateEvent() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    const eventData = new URLSearchParams();
    eventData.set('name', this.selectedEvent.title);
    eventData.set(
      'date_start',
      this.selectedEvent.date_start?.toDateString() ?? '',
    );
    eventData.set(
      'date_end',
      this.selectedEvent.date_end?.toDateString() ?? '',
    );
    eventData.set('location.id', this.eventAddress.id);
    eventData.set('status.label', this.selectedEvent.status);
    this.http
      .put(this.apiUrl + this.selectedEvent.id + '/', eventData, {
        headers,
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('event/list');
        },
        (error) => {
          console.error(error.status);
          this.updateError = true;
        },
      );
  }

  public closeDatepicker(datepicker: MatDatepicker<Date>): void {
    console.log('closing datepicker');
    datepicker['_destroyOverlay']();
  }
}
