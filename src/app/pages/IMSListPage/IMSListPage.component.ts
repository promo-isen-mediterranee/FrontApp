import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { Category } from '../../interfaces/Category';
import { MatSelect } from '@angular/material/select';
import { ItemLocation } from '../../interfaces/ItemLocation';
import { UserService } from '../../services/User.service';
import { StockItemComponent } from "../../components/stockItem/stock-item.component";
import { NgForOf, NgIf } from "@angular/common";

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-imslist-page',
  standalone: true,
  templateUrl: './IMSListPage.component.html',
  styleUrls: ['./IMSListPage.component.css'],
  imports: [
    ButtonComponent,
    RouterModule,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    StockItemComponent,
    NgIf,
    NgForOf
  ]
})
export class IMSListPageComponent implements OnInit {
  public filterControl = new FormControl();
  protected items: ItemLocation[] = [];
  protected categoriesAvailable: Category[] = [];
  private apiUrl = environment.apiStockUrl;

  protected quantityLimitedItems: ItemLocation[] = [];
  protected itemsToDisplay: ItemLocation[] = [];

  protected canWrite: boolean = false

  constructor(
    private http: HttpClient,
    private router: Router,
    protected userService: UserService,
  ) {}

  editItem(item: ItemLocation): void {
    this.router.navigate(['stock/update'], {
      state: { selectedItem: item },
    });
  }

  deleteItem(item: ItemLocation): void {
    this.http.delete(this.apiUrl + 'item/' + item.id + '/' + item.location_id.id, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.items = this.items.filter((i) => i.id !== item.id);
        this.updateCategoriesAvailable();
        this.updateItemsToDisplay();
      }, (error) => {
        if(error.status === 401) {
          this.router.navigate(['/'])
        }
        throw error;
      })
  }

  ngOnInit(): void {
    this.http
      .get<ItemLocation[]>(this.apiUrl + 'item/getAll', { withCredentials: true })
      .subscribe(
        (data) => {
          this.items = data;
          this.updateCategoriesAvailable();
          this.organizeItemsToDisplay();
        },
        (error) => {
          if(error.status === 401) {
            this.router.navigate(['/'])
          }
          throw error;
        }
      );
    this.canWrite = this.userService.hasPermission(7)
    console.log(this.canWrite)
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
      if (!categories.some((existingCat) => existingCat.id === cat.id)) {
        categories.push(cat);
      }
    });
    this.categoriesAvailable = categories;
  }

  organizeItemsToDisplay(itemStocks?: ItemLocation[]): void {
    let consumablesItems: ItemLocation[] = [];
    let generalItems: ItemLocation[] = [];
    this.quantityLimitedItems = [];
    if (!itemStocks) {
      itemStocks = this.items;
    }
    for (const item of itemStocks) {
      if (['Brochures', 'Goodies'].includes(item.item_id.category_id.label)) {
        if (item.quantity < 40) {
          this.quantityLimitedItems.push(item);
        } else {
          consumablesItems.push(item);
        }
      } else {
        if (item.item_id.category_id.label == 'Kakémono') {
          if (item.quantity < 0) {
            this.quantityLimitedItems.push(item);
          } else {
            generalItems.push(item);
          }
        } else {
          generalItems.push(item);
        }
      }
    }
    this.itemsToDisplay = [
      ...this.quantityLimitedItems,
      ...consumablesItems,
      ...generalItems,
    ];
  }

  updateItemsToDisplay(): void {
    const selectedCategory = this.filterControl.value;

    if (!selectedCategory) {
      this.organizeItemsToDisplay();
    } else {
      this.organizeItemsToDisplay(
        this.items.filter(
          (item) => item.item_id.category_id.id === selectedCategory,
        ),
      );
    }
  }
}
