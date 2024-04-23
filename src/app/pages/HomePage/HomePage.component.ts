import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './HomePage.component.html',
  styleUrl: './HomePage.component.css'
})
export class HomePageComponent {

}
