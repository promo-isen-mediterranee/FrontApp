import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { environment } from "../../../environments/environment";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { RouterModule } from '@angular/router';

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
  imports: [
    ButtonComponent,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatIcon,
    MatIconButton,
    BrowserModule,
  ],
  templateUrl: './IMSListPage.component.html',
  styleUrl: './IMSListPage.component.css',
})

export class IMSListPageComponent implements OnInit {
  items: Item[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
  ) {}

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

  toggleActions(event: MouseEvent): void {
    const fileElement = (event.currentTarget as HTMLElement).closest('.file');
    if (fileElement) {
      fileElement.classList.toggle('show-actions');
    }
  }
}
