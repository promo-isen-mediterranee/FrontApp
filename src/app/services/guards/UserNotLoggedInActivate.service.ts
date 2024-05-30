import { Injectable } from '@angular/core';
import { UserService } from '../User.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserNotLoggedInActivateService {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
