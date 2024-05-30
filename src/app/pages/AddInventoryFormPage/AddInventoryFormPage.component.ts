import { Component, Injectable, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from '../../components/select/select.component';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Location } from '../../interfaces/Location';
import { Category } from '../../interfaces/Category';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-add-inventory-form-page',
  standalone: true,
  templateUrl: './AddInventoryFormPage.component.html',
  styleUrl: './AddInventoryFormPage.component.css',
  imports: [
    ButtonComponent,
    SelectComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatSelect,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgOptimizedImage,
  ],
  providers: [MatFormFieldModule, MatInputModule],
})
export class AddInventoryFormPageComponent implements OnInit {
  public roomControl = new FormControl('', Validators.required);
  public categoryControl = new FormControl('');

  itemName: string = '';
  quantity: string = '';
  label: string = '';

  address: any;
  category: any;

  locations: Location = {} as Location;
  categories: Category = {} as Category;

  protected options: Location[] = [];
  protected optionsC: Category[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getLocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'location/getAll', {
      withCredentials: true
    });
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'category/getAll', {
      withCredentials: true
    });
  }

  ngOnInit() {
    this.getLocation().subscribe((data) => {
      this.locations = data;
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
    },  (error) => {
      if(error.status === 401) {
        this.router.navigate(['/'])
      }
      throw error;
    });
    this.getCategories().subscribe((data) => {
      this.categories = data;
      for (const category of data) {
        const optionC: Category = {
          id: category.id,
          label: category.label,
        };
        this.optionsC.push(optionC);
      }
    },  () => {
      this.router.navigate(['login'])
    });
  }

  toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  createItem() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    const itemData = new URLSearchParams();
    itemData.set('name', this.toTitleCase(this.itemName));
    itemData.set('location.id', this.address.id);
    itemData.set('category', this.category.label);
    itemData.set('quantity', this.quantity);
    this.http.post(this.apiUrl + 'item/create', itemData, {
      headers: headers,
      responseType: 'text',
      withCredentials: true,
    })
    .subscribe(
      () => {
        this.router.navigate(['/success'], {
          queryParams: {
            text:
              "L'item " +
              this.toTitleCase(this.itemName) +
              ' a été ajouté avec succès',
            link: '/stock',
          },
        });
      },
      (error) => {
        if(error.status === 401) {
          this.router.navigate(['login'])
        }
        throw error;
      }
    );
  }
}
