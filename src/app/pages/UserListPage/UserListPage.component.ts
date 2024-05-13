import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-UserListPage',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './UserListPage.component.html',
  styleUrl: './UserListPage.component.css'
})
export class UserListPageComponent {

}
