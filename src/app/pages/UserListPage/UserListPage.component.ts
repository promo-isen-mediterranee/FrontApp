import { Component, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
//import { catchError, tap } from 'rxjs/operators';
//import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { tap } from "rxjs/operators";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
interface  User {
  user:{
    username:string;
    email:string;
  };
  role:{
    id:number;
    label:string;
  };
}

@Component({
  selector: 'app-UserListPage',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './UserListPage.component.html',
  styleUrl: './UserListPage.component.css'
})
export class UserListPageComponent {
  toggleActions(event: MouseEvent): void {
    const fileElement = (event.currentTarget as HTMLElement).closest('.file');
    if (fileElement) {
      fileElement.classList.toggle('show-actions');
    }
  }

  users: User[] = [];
  private apiUrl = environment.apiUserUrl;
  constructor(private http: HttpClient) {}
  ngOnInit(){
    this.http.get<User[]>(this.apiUrl + 'getAll').pipe(
      tap((data) => {
        this.users = data;
      })
    ).subscribe();
  }
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})

export class AppModule { }
