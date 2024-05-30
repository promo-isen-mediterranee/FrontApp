import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { environment } from '../../../../environments/environment';
import { MatIcon } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-update-location-form-page',
  standalone: true,
  templateUrl: './UpdateLocationFormPage.component.html',
  styleUrl: './UpdateLocationFormPage.component.css',
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
export class UpdateLocationFormPageComponent implements OnInit {
  selectedLocation: any = {};
  private apiUrl = environment.apiStockUrl;
  Location: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedLocation = navigation.extras.state?.['selectedLocation'];
    }
  }

  ngOnInit(): void {
    this.Location = this.selectedLocation.address;
  }

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  updateLocation(form: NgForm) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    const LocationData = new URLSearchParams();
    LocationData.set(
      'address',
      this.toTitleCase(this.selectedLocation.address),
    );
    LocationData.set('city', this.toTitleCase(this.selectedLocation.city));
    LocationData.set('room', this.selectedLocation.room);
    if (form.valid) {
      this.http
        .put(
          this.apiUrl + 'location/' + this.selectedLocation.id,
          LocationData,
          {
            headers,
            responseType: 'text',
            withCredentials: true,
          },
        )
        .subscribe(
          () => {
            this.router.navigate(['/success'], {
              queryParams: {
                text:
                  'Le lieu ' +
                  this.toTitleCase(this.selectedLocation.address) +
                  ', ' +
                  this.toTitleCase(this.selectedLocation.city) +
                  ' a été mis à jour avec succès',
                link: '/location',
              },
            });
          },
          (error) => {
            if(error.status === 401) {
              this.router.navigate(['/'])
            }
          },
        );
    }
  }
}
