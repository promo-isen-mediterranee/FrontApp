import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { inject } from '@angular/core';
import { HomePageComponent } from './pages/HomePage/HomePage.component';
import { IMSListPageComponent } from './pages/IMSListPage/IMSListPage.component';
import { LogInPageComponent } from './pages/LogInPage/LogInPage.component';
import { EventListPageComponent } from './pages/EventListPage/EventListPage.component';
import { UpdateInventoryFormPageComponent } from './pages/UpdateInventoryFormPage/UpdateInventoryFormPage.component';
import { AddInventoryFormPageComponent } from './pages/AddInventoryFormPage/AddInventoryFormPage.component';
import { AddEventFormPageComponent } from './pages/AddEventFormPage/AddEventFormPage.component';
import { UpdateEventFormPageComponent } from './pages/UpdateEventFormPage/UpdateEventFormPage.component';
import { AdminPageComponent } from './pages/Admin/AdminPage/AdminPage.component';
import { UserListPageComponent } from './pages/Admin/UserListPage/UserListPage.component';
import { AddUserFormPageComponent } from './pages/Admin/AddUserFormPage/AddUserFormPage.component';
import { LocationListPageComponent } from './pages/Admin/LocationListPage/LocationListPage.component';
import { AddLocationFormPageComponent } from './pages/Admin/AddLocationFormPage/AddLocationFormPage.component';
import { UpdateLocationFormPageComponent } from './pages/Admin/UpdateLocationFormPage/UpdateLocationFormPage.component';
import { ListCategoryPageComponent } from './pages/Admin/ListCategoryPage/ListCategoryPage.component';
import { InventoryChecklistForEventComponent } from './pages/InventoryChecklistForEvent/InventoryChecklistForEvent.component';
import { AddCategoryFormComponent } from './pages/Admin/AddCategoryForm/AddCategoryForm.component';
import { LogOutPageComponent } from "./pages/LogOutPage/LogOutPage.component";
import { UserLoggedInActivateService } from './services/guards/UserLoggedInActivate.service';
import { UserAdminActivateService } from './services/guards/UserAdminActivate.service';
import { UserNotLoggedInActivateService } from './services/guards/UserNotLoggedInActivate.service';
import { SuccessPageComponent } from "./pages/SucessPage/SuccessPage.component";
import { AlertListPageComponent } from "./pages/AlertListPage/AlertListPage.component";
import { ListRolePageComponent } from "./pages/Admin/ListRolePage/ListRolePage.component";

export const canActivateUserLoggedIn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => inject(UserLoggedInActivateService).canActivate();

export const canActivateUserNotLoggedIn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => inject(UserNotLoggedInActivateService).canActivate();

export const canActivateUserAdmin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => inject(UserAdminActivateService).canActivate();

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LogInPageComponent,
  },
  {
    path: 'logout',
    component: LogOutPageComponent,
  },
  {
    path: 'stock',
    component: IMSListPageComponent,
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
    path: 'alerts',
    component: AlertListPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: 'admin/user',
    component: UserListPageComponent,
  },
  {
    path: 'admin/user/add',
    component: AddUserFormPageComponent,
  },
  {
    path: 'admin/location',
    component: LocationListPageComponent,
  },
  {
    path: 'admin/location/add',
    component: AddLocationFormPageComponent,
  },
  {
    path: 'admin/location/update',
    component: UpdateLocationFormPageComponent,
  },
  {
    path: 'admin/category',
    component: ListCategoryPageComponent,
  },
  {
    path: 'event/checklist',
    component: InventoryChecklistForEventComponent,
  },
  {
    path: 'admin/category/add',
    component: AddCategoryFormComponent,
  },
  {
    path: 'admin/role',
    component: ListRolePageComponent
  }
];
