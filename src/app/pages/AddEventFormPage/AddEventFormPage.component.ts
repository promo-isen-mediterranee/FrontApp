import { Component } from "@angular/core";
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
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { provideAnimations } from "@angular/platform-browser/animations";

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
    MatAutocompleteTrigger,
    MatError
  ],
  providers: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    provideAnimations()
  ],
  templateUrl: './AddEventFormPage.component.html',
  styleUrl: './AddEventFormPage.component.css'
})
export class AddEventFormPageComponent {

  protected options: string[] = ['option 1', 'option 2', 'option 3'];

  public closeDatepicker(datepicker: MatDatepicker<Date>): void {
    console.log('closing datepicker')
    datepicker["_destroyOverlay"]();
  }

}
