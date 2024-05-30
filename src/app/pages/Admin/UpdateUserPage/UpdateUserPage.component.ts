import { Component, OnInit } from "@angular/core";
import { ButtonComponent } from "../../../components/button/button.component";
import { FormsModule, NgForm } from "@angular/forms";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { Role } from "../../../interfaces/Role";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserRole } from "../../../interfaces/UserRole";
import { UpperCasePipe } from "@angular/common";

@Component({
  selector: 'app-update-user-page',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    UpperCasePipe
  ],
  templateUrl: './UpdateUserPage.component.html',
  styleUrl: './UpdateUserPage.component.css'
})
export class UpdateUserPageComponent implements OnInit{
  protected roles: Role[] = [];
  private apiUrl: string = environment.apiUserUrl;

  protected userToUpdate: UserRole = {} as UserRole;
  protected roleSelector: any;

  constructor(private httpClient: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.userToUpdate = navigation.extras.state?.['userToUpdate'];
      this.roleSelector = this.userToUpdate.role;
    }
  }

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
          throw error;
        }
      );
  }

  public submitForm(form: NgForm) {
    const body = new URLSearchParams();
    body.set('lastName', this.userToUpdate.user.last_name);
    body.set('firstName', this.userToUpdate.user.first_name);
    body.set('role', this.roleSelector);
    body.set('username', this.userToUpdate.user.username);
    body.set('email', this.userToUpdate.user.mail);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    this.httpClient.put(this.apiUrl + '/editUser/' + this.userToUpdate.user.id, body, {
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
