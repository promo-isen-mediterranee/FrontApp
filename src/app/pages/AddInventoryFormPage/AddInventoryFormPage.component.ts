import { Component } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { SelectComponent } from "../../components/select/select.component";
import { MatError, MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule, MatLabel } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { provideAnimations } from "@angular/platform-browser/animations";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { AsyncPipe } from "@angular/common";

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
    MatOption,
    ReactiveFormsModule,
    AsyncPipe
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
  public roomControl = new FormControl('');
  public options = [{value: 1, label: 'Option 1'}];
  filteredOption: Observable<{ value: number, label: string }[]> = new Observable();
  room: any;

  ngOnInit() {
    this.filteredOption = this.roomControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    )
  }

  private _filter(value: string): { value: number, label: string }[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
  }
}
