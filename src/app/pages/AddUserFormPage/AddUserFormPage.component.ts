import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { SelectComponent } from "../../components/select/select.component";

@Component({
  selector: 'app-AddUserFormPage',
  standalone: true,
  imports: [
    ButtonComponent,
    SelectComponent
  ],
  templateUrl: './AddUserFormPage.component.html',
  styleUrl: './AddUserFormPage.component.css'
})
export class AddUserFormPageComponent {

}
