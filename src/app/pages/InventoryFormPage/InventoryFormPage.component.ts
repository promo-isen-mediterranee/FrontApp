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
  templateUrl: './InventoryFormPage.component.html',
  styleUrl: './InventoryFormPage.component.css'
})
export class InventoryFormPageComponent {

}
