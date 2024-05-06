import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-AdminPage',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './AdminPage.component.html',
  styleUrl: './AdminPage.component.css'
})
export class AdminPageComponent {

}
