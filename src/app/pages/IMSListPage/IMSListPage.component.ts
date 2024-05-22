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
  protected itemsToDisplay: ItemStock[] = [];
  protected categoriesAvailable: Category[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  editItem(item: ItemStock) {
    this.router.navigate(['stock/update'], {
      state: { selectedItem: item },
    });
  }

  deleteItem(item: ItemStock) {
    this.http.delete(this.apiUrl + 'item/' + item.id).subscribe(() => {
      this.items = this.items.filter((i) => i.id !== item.id);
      this.updateCategoriesAvailable();
      this.itemsToDisplay = this.items;
    });
  }

  ngOnInit() {
    this.http
      .get<ItemStock[]>(this.apiUrl + 'item/getAll')
      .pipe(
        tap((data) => {
          this.items = data;
          this.updateCategoriesAvailable()
          this.itemsToDisplay = this.items;
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

  updateCategoriesAvailable() {
    const categories: Category[] = [];
    this.items.forEach((item) => {
      const cat = item.item_id.category_id;
      if (!categories.some(existingCat => existingCat.id === cat.id)) {
        categories.push(cat);
      }
    });
    this.categoriesAvailable = categories;
    console.log(this.categoriesAvailable);
  }

  updateItemsToDisplay() {
    const selectedCategory = this.filterControl.value;
    console.log(selectedCategory);
    if (!selectedCategory) {
      this.itemsToDisplay = this.items;
    } else {
      this.itemsToDisplay = this.items.filter((item) => item.item_id.category_id.id === selectedCategory);
      console.log(this.itemsToDisplay);
    }
  }

}
