import { Component } from '@angular/core';
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
  selector: 'app-add-event-form-page',
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
  templateUrl: './AddEventFormPage.component.html',
  styleUrl: './AddEventFormPage.component.css',
})
export class AddEventFormPageComponent {
  eventName: string = '';
  eventStartDate: Date | null = null;
  eventEndDate: Date | null = null;
  eventAddress: any;
  private apiUrl = environment.apiEventUrl;
  protected options: Location[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'location/getAll');
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
        const exists = this.options.some(
          (opt) => opt.city === option.city && opt.address === option.address,
        );
        if (!exists) {
          this.options.push(option);
        }
      }
    });
  }

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
    eventData.set('name', this.toTitleCase(this.eventName));
    eventData.set('date_start', this.eventStartDate?.toDateString() ?? '');
    eventData.set('date_end', this.eventEndDate?.toDateString() ?? '');
    eventData.set('location.id', this.eventAddress.id);
    this.http
      .post(this.apiUrl + 'create', eventData, {
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
        },
      );
  }

  public closeDatepicker(datepicker: MatDatepicker<Date>): void {
    console.log('closing datepicker');
    datepicker['_destroyOverlay']();
  }
}
