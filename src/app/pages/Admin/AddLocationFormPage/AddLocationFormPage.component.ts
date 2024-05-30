import { Component, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ButtonComponent } from '../../../components/button/button.component';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-add-location-form-page',
  standalone: true,
  templateUrl: './AddLocationFormPage.component.html',
  styleUrl: './AddLocationFormPage.component.css',
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
    MatIcon,
  ],
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
          headers: headers,
          responseType: 'text',
          withCredentials: true,
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
            if(error.status === 401) {
              this.router.navigate(['/']);
            }
            throw error;
          },
        );
    }
  }
}
