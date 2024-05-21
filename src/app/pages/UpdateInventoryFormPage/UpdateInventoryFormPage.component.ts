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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-inventory-form-page',
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
    FormsModule,
    NgOptimizedImage
  ],
  providers: [MatFormFieldModule, MatInputModule, provideAnimations()],
  templateUrl: './UpdateInventoryFormPage.component.html',
  styleUrl: './UpdateInventoryFormPage.component.css',
})
export class UpdateInventoryFormPageComponent {
  selectedItem: any = {};
  private apiUrl = environment.apiStockUrl;
  Location: string = '';
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedItem = navigation.extras.state?.['selectedItem'];
    }
    console.log(this.selectedItem);
  }

  updateItem() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    console.log(this.selectedItem);
    const ItemData = new URLSearchParams();
    ItemData.set('name', this.selectedItem.item_id.name);
    ItemData.set('quantity', this.selectedItem.quantity);
    ItemData.set('category', this.selectedItem.item_id.category_id.label);
    ItemData.set('location.id', this.selectedItem.location_id.id);
    this.http
      .put( this.apiUrl + 'item/' + this.selectedItem.item_id.id + '/' + this.selectedItem.location_id.id , ItemData, {
        headers,
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('stock');
        },
        (error) => {
          console.error(error.status);
        },
      );
  }

  ngOnInit() {

  }
}
