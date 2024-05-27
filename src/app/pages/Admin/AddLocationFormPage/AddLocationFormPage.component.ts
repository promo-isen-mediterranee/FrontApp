import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { ButtonComponent } from '../../../components/button/button.component';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-location-form-page',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    MatFormField,
    MatError,
    MatInput,
    MatInputModule,
    MatLabel,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [provideAnimations()],
  templateUrl: './AddLocationFormPage.component.html',
  styleUrl: './AddLocationFormPage.component.css',
})
export class AddLocationFormPageComponent {
  private apiUrl = environment.apiStockUrl;
  address: string = '';
  city: string = '';
  room: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  createLocation(form: NgForm) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    const LocationData = new URLSearchParams();
    LocationData.set('address', this.toTitleCase(this.address));
    LocationData.set('city', this.toTitleCase(this.city));
    LocationData.set('room', this.room);
    if (form.valid) {
      this.http
        .post(this.apiUrl + 'location/create', LocationData, {
          headers,
          responseType: 'text',
        })
        .subscribe(
          () => {
            this.router.navigate(['/success'], {
              queryParams: {
                text:
                  'Le lieu ' +
                  this.toTitleCase(this.toTitleCase(this.address)) +
                  ', ' +
                  this.toTitleCase(this.city) +
                  ' a été ajouté avec succès',
                link: '/location',
              },
            });
          },
          (error) => {
            console.error(error.status);
          },
        );
    }
  }
}
