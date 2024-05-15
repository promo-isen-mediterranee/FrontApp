import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { AsyncPipe } from '@angular/common';

export interface Location {
  address: string;
  city: string;
}
@Component({
  selector: 'app-add-event-form-page',
  standalone: true,
  imports: [
    ButtonComponent,
    SelectComponent,
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
  templateUrl: './AddEventFormPage.component.html',
  styleUrl: './AddEventFormPage.component.css',
})
export class AddEventFormPageComponent {
  addressControl = new FormControl();

  eventName: string = '';
  eventStartDate: Date | null = null;
  eventEndDate: Date | null = null;
  eventAddress: any;
  locations: Location = {} as Location;
  private apiUrl = environment.apiUrl;
  protected options: Location[] = [];
  constructor(private http: HttpClient) {}

  getLocation(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/event/location/getAll');
  }

  ngOnInit(): void {
    this.getLocation().subscribe((data) => {
      this.locations = data;
      for (const location of data) {
        const option: Location = {
          address: location.address,
          city: location.city,
        };
        this.options.push(option);
      }
    });
  }

  displayFn(location: Location): string {
    return location ? `${location.address}, ${location.city}` : '';
  }

  onOptionSelected(option: any): void {
    this.eventAddress = option;
  }

  createEvent() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    const eventData = new URLSearchParams();
    eventData.set('name', this.eventName);
    eventData.set('date_start', this.eventStartDate?.toISOString() ?? '');
    eventData.set('date_end', this.eventEndDate?.toISOString() ?? '');
    eventData.set('location.address', this.eventAddress.address);
    eventData.set('location.city', this.eventAddress.city);
    this.http
      .post('http://localhost:5000/event/create', eventData, { headers })
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
