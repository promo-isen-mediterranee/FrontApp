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
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

@Component({
  selector: 'app-update-event-form-page',
  standalone: true,
  imports: [
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
  locations: Location = {} as Location;
  private apiUrl = environment.apiEventUrl;
  protected options: Location[] = [];
  addressControl = new FormControl();

  eventName: string = '';
  eventAddress: any;

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

  getLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'location/getAll');
  }

  onOptionSelected(option: any): void {
    this.eventAddress = option;
  }

  ngOnInit(): void {
    this.getLocation().subscribe((data) => {
      this.locations = data;
      for (const location of data) {
        const option: Location = {
          id: location.id,
          address: location.address,
          city: location.city,
          room: location.room,
        };
        const exists = this.options.some(
          (opt) => opt.city === option.city && opt.address === option.address,
        );
        if (!exists) {
          this.options.push(option);
        }
      }
    });
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
    this.http
      .put(this.apiUrl + this.selectedEvent.id + '/', eventData, { headers })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error.status);
        },
      );
  }

  public closeDatepicker(datepicker: MatDatepicker<Date>): void {
    console.log('closing datepicker');
    datepicker['_destroyOverlay']();
  }
}
