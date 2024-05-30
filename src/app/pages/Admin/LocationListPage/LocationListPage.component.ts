import { Component, Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../../components/confirmationDialog/confirmationDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '../../../interfaces/Location';
import { UserService } from "../../../services/User.service";

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-location-list-page',
  standalone: true,
  templateUrl: './LocationListPage.component.html',
  styleUrl: './LocationListPage.component.css',
  imports: [ButtonComponent, CommonModule, MatIcon],
})
export class LocationListPageComponent implements OnInit {
  locations: Location[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    protected userService: UserService
  ) {}

  ngOnInit() {
    this.http
      .get<Location[]>(this.apiUrl + 'location/getAll', {
        withCredentials: true
      })
      .subscribe(
        (data) => {
          this.locations = data;
        },
        (error) => {
          if(error.status === 401) {
            this.router.navigate(['/']);
          }
          console.error(error);
          throw error;
        }
      )
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
            withCredentials: true,
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
              if(error.status === 401) {
                this.router.navigate(['/']);
              }
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
