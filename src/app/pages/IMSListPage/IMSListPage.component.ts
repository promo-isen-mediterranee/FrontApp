import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-imslist-page',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './IMSListPage.component.html',
  styleUrl: './IMSListPage.component.css'
})
export class IMSListPageComponent {

}
