import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { SelectComponent } from "../../components/select/select.component";
import { MatFormField, MatHint, MatInput, MatInputModule, MatLabel, MatSuffix } from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import { MatNativeDateModule, MatOption } from "@angular/material/core";
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-add-event-form-page',
  standalone: true,
  imports: [
    ButtonComponent,
    SelectComponent,
    MatInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    MatLabel,
    MatFormField,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatAutocompleteTrigger
  ],
  providers: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './AddEventFormPage.component.html',
  styleUrl: './AddEventFormPage.component.css'
})
export class AddEventFormPageComponent {

  protected options: string[] = ['option 1', 'option 2', 'option 3'];

}
