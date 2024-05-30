import { Component, Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Category } from '../../../interfaces/Category';
import { Router } from "@angular/router";
import { UserService } from "../../../services/User.service";

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-list-category-page',
  standalone: true,
  templateUrl: './ListCategoryPage.component.html',
  styleUrl: './ListCategoryPage.component.css',
  imports: [ButtonComponent, CommonModule, MatIcon],
})
export class ListCategoryPageComponent implements OnInit {
  categories: Category[] = [];
  private apiUrl = environment.apiStockUrl;

  constructor(private http: HttpClient, private router: Router, protected userService: UserService) {}

  ngOnInit() {
    this.http.get<Category[]>(this.apiUrl + 'category/getAll', {
      withCredentials: true,
    })
    .subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        if(error.status === 401) {
          this.router.navigate(['/']);
        }
        throw error;
      }
    );
  }
}
