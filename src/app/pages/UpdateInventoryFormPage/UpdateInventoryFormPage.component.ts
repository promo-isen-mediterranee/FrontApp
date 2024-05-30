import { Component, OnInit } from '@angular/core';
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
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemLocation } from '../../interfaces/ItemLocation';
import { Observable } from 'rxjs';
import { Location } from '../../interfaces/Location';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/User.service';

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
    MatIcon,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
    NgOptimizedImage,
    MatIcon,
  ],
  providers: [MatFormFieldModule, MatInputModule, provideAnimations()],
  templateUrl: './UpdateInventoryFormPage.component.html',
  styleUrl: './UpdateInventoryFormPage.component.css',
})
export class UpdateInventoryFormPageComponent implements OnInit {
  public roomControl = new FormControl('', Validators.required);
  selectedItem: ItemLocation = {} as ItemLocation;

  private apiUrl = environment.apiStockUrl;
  protected options: Location[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedItem = navigation.extras.state?.['selectedItem'];
      this.roomControl.setValue(this.selectedItem?.location_id?.room ?? '');
    }
  }

  getLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'location/getAll', {
      withCredentials: true,
    });
  }

  ngOnInit() {
    this.getLocation().subscribe((data) => {
      for (const location of data) {
        const option: Location = {
          id: location.id,
          address: location.address,
          city: location.city,
          room: location.room,
        };
        if (location.room != '') {
          this.options.push(option);
        }
      }
    }, (error) => {
      if(error.status === 401) {
        this.router.navigate(['/'])
      }
      throw error;
    });
  }

  updateItem() {
    if (
      !this.selectedItem ||
      !this.selectedItem.item_id ||
      !this.selectedItem.location_id
    ) {
      console.error('Selected item is not properly defined');
      return;
    }

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    const ItemData = new URLSearchParams();
    ItemData.set('name', this.selectedItem.item_id.name ?? '');
    ItemData.set('quantity', String(this.selectedItem.quantity ?? 0));
    ItemData.set('category', this.selectedItem.item_id.category_id.label ?? '');
    ItemData.set('location.id', String(this.selectedItem.location_id.id ?? ''));
    this.http
      .put(
        this.apiUrl +
          'item/' +
          this.selectedItem.item_id.id +
          '/' +
          this.selectedItem.location_id.id,
        ItemData,
        {
          headers,
          responseType: 'text',
          withCredentials: true,
        },
      )
      .subscribe(
        () => {
          this.router.navigateByUrl('stock');
        },
        (error) => {
          if(error.status === 401) {
            this.router.navigate(['/'])
          }
          throw error;
        },
      );
  }
}
