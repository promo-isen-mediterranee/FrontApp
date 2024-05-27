import { Component, NgModule } from "@angular/core";
import { ButtonComponent } from "../../../components/button/button.component";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { tap } from "rxjs/operators";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, NgFor } from "@angular/common";
import { UserRole } from "../../../interfaces/UserRole";


@Component({
  selector: 'app-UserListPage',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIconModule,
    MatButtonModule,
    NgFor
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

  users: UserRole[] = [];
 private apiUrl = environment.apiUserUrl;
  constructor(private http: HttpClient) {}
  ngOnInit(){
    this.http.get<UserRole[]>(this.apiUrl + 'getAllUsers').pipe(
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
  providers: []
})

export class AppModule { }
