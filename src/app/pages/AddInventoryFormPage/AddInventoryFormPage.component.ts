import { Component } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { SelectComponent } from "../../components/select/select.component";
import { MatError, MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule, MatLabel } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { provideAnimations } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-add-inventory-form-page',
  standalone: true,
  imports: [
    ButtonComponent,
    SelectComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatSelect,
    MatOption
  ],
  providers: [
    MatFormFieldModule,
    MatInputModule,
    provideAnimations()
  ],
  templateUrl: './AddInventoryFormPage.component.html',
  styleUrl: './AddInventoryFormPage.component.css'
})
export class AddInventoryFormPageComponent {
  public options = [{value: '1', label: 'Option 1'}];
}
