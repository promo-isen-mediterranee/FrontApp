import { Component } from '@angular/core';
import { SelectComponent } from "../../components/select/select.component";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-inventory-form-page',
  standalone: true,
  imports: [
    SelectComponent,
    ButtonComponent
  ],
  templateUrl: './UpdateInventoryFormPage.component.html',
  styleUrl: './UpdateInventoryFormPage.component.css'
})
export class UpdateInventoryFormPageComponent {

}
