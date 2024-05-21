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
import { AsyncPipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface Item {
  id: number;
  item_id: {
    id: number;
    name: string;
    category_id: {
      id: number;
      label: string;
    };
  };
  location_id: {
    id: number;
    address: string;
    city: string;
    room: string;
  };
  quantity: number;
}

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
  ],
  providers: [MatFormFieldModule, MatInputModule, provideAnimations()],
  templateUrl: './UpdateInventoryFormPage.component.html',
  styleUrl: './UpdateInventoryFormPage.component.css',
})
export class UpdateInventoryFormPageComponent {
  selectedItem: Item = {
    id: 0,
    item_id: {
      id: 0,
      name: '',
      category_id: {
        id: 0,
        label: ''
      }
    },
    location_id: {
      id: 0,
      address: '',
      city: '',
      room: ''
    },
    quantity: 0
  };

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
    ItemData.set('name', this.selectedItem?.item_id?.name ?? '');
    ItemData.set('quantity', String(this.selectedItem?.quantity ?? 0));
    ItemData.set('category', this.selectedItem?.item_id.category_id.label ?? '');
    ItemData.set('location.id', String(this.selectedItem?.location_id.id ?? ''));
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
