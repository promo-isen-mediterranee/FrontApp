import { Component, OnInit } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { Alert } from "../../interfaces/Alert";
import { AlertComponent } from "../../components/alert/alert.component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-alert-list-page',
  standalone: true,
  imports: [
    MatIcon,
    AlertComponent,
    NgIf
  ],
  templateUrl: './AlertListPage.component.html',
  styleUrl: './AlertListPage.component.css'
})
export class AlertListPageComponent implements OnInit{
  private apiUrl: string = environment.apiUserUrl;
  protected alerts: Alert[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Alert[]>(`${this.apiUrl}getAllAlerts`, {withCredentials: true}).subscribe((data) => {
      this.alerts = data;
    }, (error) => {
      if(error.status === 401) {
        this.router.navigate(["/"])
      }
      throw error;
    })
  }

}
