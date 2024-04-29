import { Routes } from '@angular/router';
import { HomePageComponent } from "./pages/HomePage/HomePage.component";
import { IMSListPageComponent } from "./pages/IMSListPage/IMSListPage.component";
import { LogInPageComponent } from "./pages/LogInPage/LogInPage.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'stock',
    component: IMSListPageComponent,
  },
  {
    path: 'login',
    component: LogInPageComponent,
  }
];
