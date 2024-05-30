import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from "../../../services/User.service";
import { Router } from "@angular/router";
import { ButtonComponent } from "../../../components/button/button.component";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-add-role-form-page',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './AddRoleFormPage.component.html',
  styleUrl: './AddRoleFormPage.component.css'
})
export class AddRoleFormPageComponent {
  protected roleFormControl = new FormControl('');
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
  ) {}

  submitForm() {
    if (this.roleFormControl.value != null) {
      const headers = new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded',
      );
      const roleData = new URLSearchParams();
      roleData.set('label', this.roleFormControl.value);

      this.http.post(this.apiUrl + 'addRole/' + this.roleFormControl.value, roleData, {
        headers: headers,
        responseType: 'text',
        withCredentials: true,
      }).subscribe(null,
        (error) => {
          if(error.status == 401) {
            this.router.navigate(['/'])
          }
          throw error;
        }
      );
    }
  }
}
