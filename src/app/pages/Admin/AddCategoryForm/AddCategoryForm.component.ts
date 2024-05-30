import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../services/User.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    ButtonComponent,
    MatFormField,
    MatError,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './AddCategoryForm.component.html',
  styleUrl: './AddCategoryForm.component.css',
})
export class AddCategoryFormComponent {
  protected categoryFormControl = new FormControl('');
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
  ) {}

  submitForm() {
    if (this.categoryFormControl.value != null) {
      const headers = new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded',
      );
      const categoryData = new URLSearchParams();
      categoryData.set('label', this.categoryFormControl.value);

      this.http.post(this.apiUrl + 'category/create', categoryData, {
        headers: headers,
        responseType: 'text',
        withCredentials: true,
      }).subscribe(null,
        (error) => {
          if(error.status == 401) {
            this.router.navigate(['/'])
          }
          throw error;
        }
      );
    }
  }
}
