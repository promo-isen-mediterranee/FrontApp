import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { SelectComponent } from "../../components/select/select.component";

@Component({
  selector: 'app-add-inventory-form-page',
  standalone: true,
  imports: [
    ButtonComponent,
    SelectComponent
  ],
  templateUrl: './AddInventoryFormPage.component.html',
  styleUrl: './AddInventoryFormPage.component.css'
})
export class AddInventoryFormPageComponent {

}
