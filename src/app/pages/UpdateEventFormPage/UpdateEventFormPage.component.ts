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
import { FormsModule, NgForm } from '@angular/forms';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/ConfirmationDialog/ConfirmationDialog.component';

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

export interface Person {
  id: string;
  last_name: string;
  first_name: string;
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

  private apiUrl = environment.apiEventUrl;
  protected optionsL: Location[] = [];
  protected optionsS: Status[] = [];
  protected optionsM: Person[] = [];

  eventName: string = '';
  eventAddress: any;
  eventStatus: Status = { id: 0, label: '' };
  eventManager: Person = { id: '', last_name: 'A', first_name: 'Definir' };

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedEvent = navigation.extras.state?.['selectedEvent'];
      this.eventManager = this.selectedEvent.item_manager;
    }
  }

  displayFn(location: Location): string {
    return location ? `${location.address}, ${location.city}` : '';
  }

  displayS(status: Status): string {
    return status ? status.label : '';
  }

  displayMn(person: Person): string {
    return person ? `${person.last_name} ${person.first_name}` : '';
  }

  getPerson(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'person/getAll');
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

  onOptionSelectedM(option: any): void {
    this.eventManager = option;
  }

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
    });

    this.eventStatus.label = this.selectedEvent.status;
    this.eventName = this.selectedEvent.title;
  }

  updateEvent(form: NgForm) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    const eventData = new URLSearchParams();
    eventData.set('name', this.toTitleCase(this.selectedEvent.title));
    eventData.set(
      'date_start',
      this.selectedEvent.date_start?.toDateString() ?? '',
    );
    eventData.set(
      'date_end',
      this.selectedEvent.date_end?.toDateString() ?? '',
    );
    eventData.set('location.id', this.eventAddress.id);
    eventData.set('status.label', this.eventStatus.label);
    eventData.set('contact_objective', this.selectedEvent.contact_objective);
    eventData.set('stand_size', this.selectedEvent.stand_size);
    eventData.set('item_manager.last_name', this.eventManager.last_name);
    eventData.set('item_manager.first_name', this.eventManager.first_name);
    if (form.valid) {
      this.http
        .put(this.apiUrl + this.selectedEvent.id, eventData, {
          headers,
          responseType: 'text',
        })
        .subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['/success'], {
              queryParams: {
                text:
                  'L évènement ' +
                  this.toTitleCase(this.eventName) +
                  ' a été mis à jour avec succès',
                link: '/event/list',
              },
            });
          },
          (error) => {
            console.error(error.status);
          },
        );
    }
  }
  deleteEvent() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .delete(this.apiUrl + this.selectedEvent.id, {
            responseType: 'text',
            observe: 'response',
          })
          .subscribe(
            (response) => {
              if (response.status == 204)
                this.router.navigate(['/success'], {
                  queryParams: {
                    text:
                      'L évènement ' +
                      this.toTitleCase(this.eventName) +
                      ' a été supprimé avec succès',
                    link: '/event/list',
                  },
                });
              else {
                this.snackBar.open(
                  'Une erreur est survenue: ' + response.body,
                  'Fermer',
                  {
                    duration: 5000,
                  },
                );
              }
            },
            (error) => {
              console.error(error.status);
              this.snackBar.open(
                'Une erreur est survenue: ' + error.message,
                'Fermer',
                {
                  duration: 5000,
                },
              );
            },
          );
      }
    });
  }

  public closeDatepicker(datepicker: MatDatepicker<Date>): void {
    console.log('closing datepicker');
    datepicker['_destroyOverlay']();
  }
}
