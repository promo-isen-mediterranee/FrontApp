import { Routes } from '@angular/router';
import { HomePageComponent } from "./pages/HomePage/HomePage.component";
import { IMSListPageComponent } from "./pages/IMSListPage/IMSListPage.component";
import { LogInPageComponent } from "./pages/LogInPage/LogInPage.component";
import { SuccessPageComponent } from "./pages/SucessPage/SuccessPage.component";
import { InventoryFormPageComponent } from "./pages/InventoryFormPage/InventoryFormPage.component";

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
  },
  {
    path: 'success',
    component: SuccessPageComponent,
  },
  {
    path: 'inventory/form',
    component: InventoryFormPageComponent,
  }
];
