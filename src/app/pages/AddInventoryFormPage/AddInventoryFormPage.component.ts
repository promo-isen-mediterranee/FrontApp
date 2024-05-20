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
import {
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface Location {
  id: number;
  address: string;
  city: string;
  room?: string;
}

export interface Category {
  label: string;
}

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
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  providers: [MatFormFieldModule, MatInputModule, provideAnimations()],
  templateUrl: './AddInventoryFormPage.component.html',
  styleUrl: './AddInventoryFormPage.component.css',
})
export class AddInventoryFormPageComponent {
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
    return this.http.get<any>(this.apiUrl + 'location/getAll');
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'category/getAll');
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
        this.options.push(option);
      }
    });
    this.getCategories().subscribe((data) => {
      this.categories = data;
      for (const category of data) {
        const optionC: Category = {
          label: category.label,
        };
        this.optionsC.push(optionC);
      }
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
    this.http
      .post(this.apiUrl + 'item/create', itemData, {
        headers,
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          this.router.navigate(['/success'], {
            queryParams: {
              text:
                'L item ' +
                this.toTitleCase(this.itemName) +
                ' a été ajouté avec succès',
              link: '/stock',
            },
          });
        },
        (error) => {
          console.error(error.status);
        },
      );
  }
}
