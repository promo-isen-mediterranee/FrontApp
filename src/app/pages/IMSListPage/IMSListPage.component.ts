import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

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
  selector: 'app-imslist-page',
  standalone: true,
  imports: [ButtonComponent, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './IMSListPage.component.html',
  styleUrl: './IMSListPage.component.css',
})
export class IMSListPageComponent implements OnInit {
  items: Item[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Item[]>(this.apiUrl + 'item/getAll')
      .pipe(
        tap((data) => {
          this.items = data;
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        }),
      )
      .subscribe();
  }
}

@NgModule({
  imports: [BrowserModule, HttpClientModule, CommonModule, RouterModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
