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
import { ConfirmationDialogComponent } from '../../components/ConfirmationDialog/ConfirmationDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '../../interfaces/Location';

@Component({
  selector: 'app-location-list-page',
  standalone: true,
  imports: [ButtonComponent, CommonModule, MatIcon, HttpClientModule],
  templateUrl: './LocationListPage.component.html',
  styleUrl: './LocationListPage.component.css',
})
export class LocationListPageComponent {
  locations: Location[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .delete(this.apiUrl + 'location/' + location.id, {
            responseType: 'text',
            observe: 'response',
          })
          .subscribe(
            (response) => {
              if (response.status == 204)
                this.router.navigate(['/success'], {
                  queryParams: {
                    text: 'Le lieu a été supprimé avec succès',
                    link: '/location',
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
}

@NgModule({
  imports: [BrowserModule, HttpClientModule, CommonModule, RouterModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
