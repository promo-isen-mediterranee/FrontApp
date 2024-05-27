import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatFormField } from "@angular/material/form-field";
import { MatInput, MatLabel } from "@angular/material/input";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatOption } from "@angular/material/autocomplete";
import { Category } from "../../interfaces/Category";
import { MatSelect } from "@angular/material/select";
import { ItemStock } from "../../interfaces/ItemStock";

@Component({
  selector: 'app-imslist-page',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './IMSListPage.component.html',
  styleUrls: ['./IMSListPage.component.css']
})
export class IMSListPageComponent implements OnInit {
  public filterControl = new FormControl();
  protected items: ItemStock[] = [];
  protected categoriesAvailable: Category[] = [];
  private apiUrl = environment.apiStockUrl;


  protected quantityLimitedItems: ItemStock[] = [];
  protected itemsToDisplay: ItemStock[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  editItem(item: ItemStock): void {
    this.router.navigate(['stock/update'], {
      state: { selectedItem: item },
    });
  }

  deleteItem(item: ItemStock): void {
    this.http.delete(this.apiUrl + 'item/' + item.id + '/' + item.location_id.id).subscribe(() => {
      this.items = this.items.filter((i) => i.id !== item.id);
      this.updateCategoriesAvailable();
      this.updateItemsToDisplay();
    });
  }

  ngOnInit(): void {
    this.http
      .get<ItemStock[]>(this.apiUrl + 'item/getAll')
      .pipe(
        tap((data) => {
          this.items = data;
          this.updateCategoriesAvailable()
          this.organizeItemsToDisplay()
        }),
        catchError((error) => {
          throw error;
        }),
      )
      .subscribe();
  }

  toggleActions(event: MouseEvent): void {
    const fileElement = (event.currentTarget as HTMLElement).closest('.file');
    if (fileElement) {
      fileElement.classList.toggle('show-actions');
    }
  }

  updateCategoriesAvailable(): void {
    const categories: Category[] = [];
    this.items.forEach((item) => {
      const cat = item.item_id.category_id;
      if (!categories.some(existingCat => existingCat.id === cat.id)) {
        categories.push(cat);
      }
    });
    this.categoriesAvailable = categories;
  }

  organizeItemsToDisplay(itemStocks?: ItemStock[]): void {
    let consumablesItems: ItemStock[] = [];
    let generalItems: ItemStock[] = [];
    if (!itemStocks) {
      itemStocks = this.items;
    }
    for (const item of itemStocks) {
      if(['Brochures', 'Goodies'].includes(item.item_id.category_id.label)) {
        if(item.quantity < 40) {
          this.quantityLimitedItems.push(item);
        }
        else {
          consumablesItems.push(item);
        }
      } else {
        if (item.item_id.category_id.label == 'Kakémono') {
          if(item.quantity < 0) {
            this.quantityLimitedItems.push(item);
          } else {
            generalItems.push(item);
          }
        } else {
          generalItems.push(item);
        }
      }
    }
    this.itemsToDisplay = [...this.quantityLimitedItems, ...consumablesItems, ...generalItems]
  }

  updateItemsToDisplay(): void {
    const selectedCategory = this.filterControl.value;

    if (!selectedCategory) {
      this.organizeItemsToDisplay()
    } else {
      this.organizeItemsToDisplay(this.items.filter((item) => item.item_id.category_id.id === selectedCategory));
    }
  }

}
