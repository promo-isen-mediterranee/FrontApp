import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

export interface Location {
  id: number;
  address: string;
  city: string;
  room?: string;
}
@Component({
  selector: 'app-location-list-page',
  standalone: true,
  imports: [ButtonComponent, CommonModule, MatIcon],
  templateUrl: './LocationListPage.component.html',
  styleUrl: './LocationListPage.component.css',
})
export class LocationListPageComponent {
  locations: Location[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.http
      .get<Location[]>(this.apiUrl + 'location/getAll')
      .pipe(
        tap((data) => {
          this.locations = data;
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        }),
      )
      .subscribe();
  }

  editLocation(location: Location) {
    this.router.navigate(['location/update'], {
      state: { selectedLocation: location },
    });
  }

  deleteLocation(location: Location) {
    this.http
      .delete(this.apiUrl + 'location/' + location.id + '/', {
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.http
            .get<Location[]>(this.apiUrl + 'location/getAll')
            .pipe(
              tap((data) => {
                this.locations = data;
              }),
              catchError((error) => {
                console.error(error);
                throw error;
              }),
            )
            .subscribe();
        },
        (error) => {
          console.error(error.status);
        },
      );
  }
}

@NgModule({
  imports: [BrowserModule, HttpClientModule, CommonModule, RouterModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
