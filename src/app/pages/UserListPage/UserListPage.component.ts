import { Component } from '@angular/core';
//import { catchError, tap } from 'rxjs/operators';
//import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
}

