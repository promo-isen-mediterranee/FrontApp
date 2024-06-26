import { Component, Injectable, OnInit } from '@angular/core';
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
import { FormsModule, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '../../interfaces/Location';
import { Person } from '../../interfaces/Person';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-add-event-form-page',
  standalone: true,
  templateUrl: './AddEventFormPage.component.html',
  styleUrl: './AddEventFormPage.component.css',
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
  providers: [MatDatepickerModule, MatInputModule, MatFormFieldModule],
})
export class AddEventFormPageComponent implements OnInit {
  eventName: string = '';
  eventStartDate: Date | null = null;
  eventEndDate: Date | null = null;
  eventAddress: any;
  eventManager: Person = { id: '', last_name: 'A', first_name: 'Definir' };
  eventSize: string = '';
  eventContact: string = '';
  private apiUrl = environment.apiEventUrl;
  protected options: Location[] = [];
  protected optionsM: Person[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'location/getAll', {
      withCredentials: true,
    });
  }

  getPerson(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'person/getAll', {
      withCredentials: true,
    });
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
    }, (error) => {
      if(error.status === 401) {
        this.router.navigate(['login'])
      }
    });
    this.getPerson().subscribe((data) => {
      for (const person of data) {
        const option: Person = {
          id: person.id,
          last_name: person.last_name,
          first_name: person.first_name,
        };
        const exists = this.optionsM.some(
          (opt) =>
            opt.last_name === option.last_name &&
            opt.first_name === option.first_name,
        );
        if (!exists) {
          this.optionsM.push(option);
        }
      }
    }, (error) => {
      if(error.status === 401) {
        this.router.navigate(['login'])
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

  displayMn(person: Person): string {
    return person ? `${person.last_name} ${person.first_name}` : '';
  }

  onOptionSelected(option: any): void {
    this.eventAddress = option;
  }

  onOptionSelectedM(option: any): void {
    this.eventManager = option;
  }

  createEvent(form: NgForm) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );

    const eventData = new URLSearchParams();
    eventData.set('name', this.toTitleCase(this.eventName));
    eventData.set('date_start', this.eventStartDate?.toDateString() ?? '');
    eventData.set('date_end', this.eventEndDate?.toDateString() ?? '');
    eventData.set('stand_size', this.eventSize);
    eventData.set('contact_objective', this.eventContact);
    eventData.set('location.id', this.eventAddress.id);
    eventData.set('item_manager.last_name', this.eventManager.last_name);
    eventData.set('item_manager.first_name', this.eventManager.first_name);
    if (form.valid) {
      this.http
        .post(this.apiUrl + 'create', eventData, {
          headers: headers,
          responseType: 'text',
          withCredentials: true,
        })
        .subscribe(
          () => {
            this.router.navigate(['/success'], {
              queryParams: {
                text:
                  "L'évènement " +
                  this.toTitleCase(this.eventName) +
                  ' a été ajouté avec succès',
                link: '/event/list',
              },
            });
          },
          (error) => {
            if(error.status === 401) {
              this.router.navigate(['login'])
            }
            console.error(error.status);
          },
        );
    }
  }

  public closeDatepicker(datepicker: MatDatepicker<Date>): void {
    datepicker['_destroyOverlay']();
  }
}
