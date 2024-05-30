import { Component, Injectable, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { MatFormField } from "@angular/material/form-field";
import { MatInput, MatLabel } from "@angular/material/input";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { map, Observable } from "rxjs";
import { ConfirmationDialogComponent } from "../../../components/confirmationDialog/confirmationDialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserRolePermission } from "../../../interfaces/UserRolePermission";
import { UserService } from "../../../services/User.service";

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-UserListPage',
  standalone: true,
  imports: [ButtonComponent, MatIconModule, MatButtonModule, NgFor, MatFormField, MatInput, MatAutocomplete, MatOption, MatAutocompleteTrigger, ReactiveFormsModule, AsyncPipe, MatLabel, NgIf],
  templateUrl: './UserListPage.component.html',
  styleUrl: './UserListPage.component.css',
})
export class UserListPageComponent implements OnInit {
  users: UserRolePermission[] = [];
  private apiUrl = environment.apiUserUrl;
  protected searchFieldControl = new FormControl<string | UserRolePermission>('');
  protected filteredOptions: Observable<UserRolePermission[]> = new Observable();
  protected userRoles: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    protected userService: UserService
  ) {}

  private _filter(name: string): UserRolePermission[] {
    const filterValue = name.toLowerCase();
    return this.users.filter((option) => {
      option.user.first_name.toLowerCase().includes(filterValue) || option.user.last_name.toLowerCase().includes(filterValue)
    });
  }

  toggleActions(event: MouseEvent): void {
    const fileElement = (event.currentTarget as HTMLElement).closest('.file');
    if (fileElement) {
      fileElement.classList.toggle('show-actions');
    }
  }

  ngOnInit() {
    this.http
      .get<UserRolePermission[]>(this.apiUrl + 'getAllUsers', { withCredentials: true })
      .subscribe(
        (data) => {
          this.users = data;
          this.users.forEach((user) => {
            this.userRoles.push(this.getRolesForUser(user));
          });
        }, (error) => {
          if(error.status === 401) {
            this.router.navigate(['/']);
          }
        }
      );
    this.filteredOptions = this.searchFieldControl.valueChanges.pipe(
      map(value => {
        const name = typeof value === "string" ? value : value?.user.first_name;
        return name ? this._filter(name as string): this.users.slice();
      })
    )
  }

  private getRolesForUser(user: UserRolePermission) {
    if(user.roles) {
      return user.roles.map((role) => role.label).join(', ');
    }
    return undefined;
  }

  editUser(user: UserRolePermission) {
    this.router.navigate(['user/update'], {
      state: { userToUpdate: user },
    });
  }

  deleteUser(user: UserRolePermission) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .delete(this.apiUrl + 'editUser/' + user.user.id, {
            responseType: 'text',
            observe: 'response',
            withCredentials: true,
          })
          .subscribe(
            (response) => {
              if (response.status == 204)
                this.router.navigate(['/success'], {
                  queryParams: {
                    text: "L'utilisateur a été supprimé avec succès",
                    link: '/user',
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
              if (error.status === 401) {
                this.router.navigate(['/']);
              }
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
