import { Component, OnInit } from "@angular/core";
import { Role } from "../../../interfaces/Role";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ButtonComponent } from "../../../components/button/button.component";
import { MatIcon } from "@angular/material/icon";
import { NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { UserService } from "../../../services/User.service";

@Component({
  selector: 'app-add-role-form',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIcon,
    NgForOf,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './ListRolePage.component.html',
  styleUrl: './ListRolePage.component.css'
})
export class ListRolePageComponent implements OnInit{
  protected roles: Role[] = [];

  private apiURL: string = environment.apiUserUrl;

  constructor(private http: HttpClient, private router: Router, protected userService: UserService) {
  }

  ngOnInit() {
    this.http.get<Role[]>(this.apiURL + "getRoles", {withCredentials: true}).subscribe((data) => {
      this.roles = data;
    }, (error) => {
      if(error.status === 401) {
        this.router.navigate(["/"])
      }
      throw error;
    })
  }

}
