import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/HomePage/HomePage.component';
import { IMSListPageComponent } from './pages/IMSListPage/IMSListPage.component';
import { LogInPageComponent } from './pages/LogInPage/LogInPage.component';
import { SuccessPageComponent } from './pages/SucessPage/SuccessPage.component';
import { EventListPageComponent } from './pages/EventListPage/EventListPage.component';
import { UpdateInventoryFormPageComponent } from './pages/UpdateInventoryFormPage/UpdateInventoryFormPage.component';
import { AddInventoryFormPageComponent } from './pages/AddInventoryFormPage/AddInventoryFormPage.component';
import { AddEventFormPageComponent } from './pages/AddEventFormPage/AddEventFormPage.component';
import { UpdateEventFormPageComponent } from './pages/UpdateEventFormPage/UpdateEventFormPage.component';
import { AdminPageComponent } from './pages/AdminPage/AdminPage.component';
import { UserListPageComponent } from './pages/UserListPage/UserListPage.component';
import { AddUserFormPageComponent } from './pages/AddUserFormPage/AddUserFormPage.component';
import { LocationListPageComponent } from './pages/LocationListPage/LocationListPage.component';
import { AddLocationFormPageComponent } from './pages/AddLocationFormPage/AddLocationFormPage.component';
import { UpdateLocationFormPageComponent } from './pages/UpdateLocationFormPage/UpdateLocationFormPage.component';

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
    path: 'stock/update',
    component: UpdateInventoryFormPageComponent,
  },
  {
    path: 'stock/add',
    component: AddInventoryFormPageComponent,
  },
  {
    path: 'event/list',
    component: EventListPageComponent,
  },
  {
    path: 'event/add',
    component: AddEventFormPageComponent,
  },
  {
    path: 'event/update',
    component: UpdateEventFormPageComponent,
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: 'user',
    component: UserListPageComponent,
  },
  {
    path: 'user/add',
    component: AddUserFormPageComponent,
  },
  {
    path: 'location',
    component: LocationListPageComponent,
  },
  {
    path: 'location/add',
    component: AddLocationFormPageComponent,
  },
  {
    path: 'location/update',
    component: UpdateLocationFormPageComponent,
  },
];
