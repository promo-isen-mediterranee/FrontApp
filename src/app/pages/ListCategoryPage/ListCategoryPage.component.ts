import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

export interface Category {
  id: number;
  label: string;
}
@Component({
  selector: 'app-list-category-page',
  standalone: true,
  imports: [ButtonComponent, CommonModule, MatIcon, HttpClientModule],
  templateUrl: './ListCategoryPage.component.html',
  styleUrl: './ListCategoryPage.component.css',
})
export class ListCategoryPageComponent {
  categories: Category[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.http
      .get<Category[]>(this.apiUrl + 'category/getAll')
      .pipe(
        tap((data) => {
          this.categories = data;
        }),
        catchError((error) => {
          console.error(error);
          throw error;
        }),
      )
      .subscribe();
  }
}
