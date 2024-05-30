import { Component, Injectable, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { SelectComponent } from '../../../components/select/select.component';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Role } from '../../../interfaces/Role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MatIcon } from '@angular/material/icon';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-AddUserFormPage',
  standalone: true,
  imports: [
    ButtonComponent,
    SelectComponent,
    MatError,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './AddUserFormPage.component.html',
  styleUrl: './AddUserFormPage.component.css',
})
export class AddUserFormPageComponent implements OnInit {
  protected roles: Role[] = [];
  private apiUrl: string = environment.apiUserUrl;

  protected userNameControl = new FormControl('', Validators.required);
  protected userSurnameControl = new FormControl('', Validators.required);
  protected userEmailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  protected userUsernameControl = new FormControl('', Validators.required);
  protected roleSelector: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    this.httpClient
      .get<Role[]>(this.apiUrl + '/getRoles', { withCredentials: true })
      .subscribe(
        (data) => {
          this.roles = data;
        },
        (error) => {
          if(error.status === 401) {
            this.router.navigate(['/']);
          }
          console.error(error);
          throw error;
        }
      );
  }

  public submitForm() {
    if (
      this.userNameControl.value == null ||
      this.userSurnameControl.value == null ||
      this.userEmailControl.value == null ||
      this.userUsernameControl.value == null
    ) {
      console.error('Invalid form');
      return;
    }
    const body = new URLSearchParams();
    body.set('name', this.userNameControl.value);
    body.set('surname', this.userSurnameControl.value);
    body.set('role', this.roleSelector);
    body.set('username', this.userUsernameControl.value);
    body.set('email', this.userEmailControl.value);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    this.httpClient.post(this.apiUrl + '/addUser', body, {
      headers,
      responseType: 'text',
      withCredentials: true,
    }).subscribe(null, (error) => {
      if(error.status === 401) {
        this.router.navigate(['/']);
      }
    });
  }
}
