import { Injectable } from '@angular/core';
import { UserService } from '../User.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserAdminActivateService {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (!this.userService.isAdmin()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
