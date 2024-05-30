import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { UserRolePermission } from "../interfaces/UserRolePermission";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = environment.apiUserUrl;
  static user: UserRolePermission | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getUserData(username: string, password: string) {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http
      .post<UserRolePermission>(`${this.apiUrl}login`, body, {
        headers: headers,
        withCredentials: true,
      })
      .subscribe((body) => {
        UserService.user = body;
        window.sessionStorage.setItem('jwt', JSON.stringify(body));
        window.sessionStorage.setItem('expiring_on', (Date.now() + 3600000).toString());
        if (this.isLoggedIn()) {
          this.router.navigate(['/'])
        }
      });
  }

  getUserName(): string | void {
    if(this.isLoggedIn()) {
      if (UserService.user?.user?.first_name !== undefined) {
        return UserService.user?.user.first_name;
      }
    }
  }

  isLoggedIn(): boolean {
    let time = window.sessionStorage.getItem('expiring_on');
    if (window.sessionStorage.getItem('jwt') !== null && time !== null && time > Date.now().toString()) {
      if(time < (Date.now() + 900000).toString()) {
        window.sessionStorage.setItem('expiring_on', (Date.now() + 3600000).toString());
      }
      UserService.user = JSON.parse(window.sessionStorage.getItem('jwt') as string);
      if(UserService.user === null || UserService.user === undefined) {
        window.sessionStorage.removeItem('jwt')
      }
    }
    return !!UserService.user;
  }

  isAdmin(): boolean {
    let isAdmin = false;
    if (this.isLoggedIn()) {
      UserService.user?.roles.forEach((role): void => {
        if(role.label.includes('Admin')) {
          isAdmin = true;
        }
      })
    }
    return isAdmin;
  }

  logout() {
    window.sessionStorage.removeItem('jwt');
    window.sessionStorage.removeItem('expiring_on')
    this.http.post<string>(`${this.apiUrl}logout`, {}, { withCredentials: true }).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  hasPermission(permission: number): boolean {
    let hasPermission = false;
    if(this.isLoggedIn()) {
      UserService.user?.roles.forEach((role): void => {
        role.permissions.forEach((perm): void => {
          if(perm.id === permission) {
            hasPermission = true;
          }
        })
      })
    }
    return hasPermission;
  }
}
