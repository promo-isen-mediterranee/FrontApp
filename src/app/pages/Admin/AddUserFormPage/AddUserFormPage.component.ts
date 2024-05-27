import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { SelectComponent } from '../../../components/select/select.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-AddUserFormPage',
  standalone: true,
  imports: [
    ButtonComponent,
    SelectComponent,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
  ],
  templateUrl: './AddUserFormPage.component.html',
  styleUrl: './AddUserFormPage.component.css',
})
export class AddUserFormPageComponent {
  protected roles = [
    { value: 1, label: 'role1' },
    { value: 2, label: 'role2' },
  ];
  public roleSelector = 0;
}
