import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from '../../components/select/select.component';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe,
  ],
  providers: [MatFormFieldModule, MatInputModule, provideAnimations()],
  templateUrl: './UpdateInventoryFormPage.component.html',
  styleUrl: './UpdateInventoryFormPage.component.css',
})
export class UpdateInventoryFormPageComponent {
  public itemControl = new FormControl('');
  public itemOptions = [{ value: 1, label: 'Option 1' }];
  itemFilteredOption: Observable<{ value: number; label: string }[]> =
    new Observable();
  item: any;

  private item_filter(value: string): { value: number; label: string }[] {
    const filterValue = value.toLowerCase();
    return this.roomOptions.filter((option) =>
      option.label.toLowerCase().includes(filterValue),
    );
  }

  item_ngOnInit() {
    this.roomFilteredOption = this.roomControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.item_filter(value || '')),
    );
  }

  public roomControl = new FormControl('');
  public roomOptions = [{ value: 1, label: 'Option 1' }];
  roomFilteredOption: Observable<{ value: number; label: string }[]> =
    new Observable();
  room: any;

  private room_filter(value: string): { value: number; label: string }[] {
    const filterValue = value.toLowerCase();
    return this.roomOptions.filter((option) =>
      option.label.toLowerCase().includes(filterValue),
    );
  }

  room_ngOnInit() {
    this.itemFilteredOption = this.itemControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.room_filter(value || '')),
    );
  }
}
