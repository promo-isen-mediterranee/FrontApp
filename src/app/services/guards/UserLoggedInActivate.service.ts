import { Injectable } from '@angular/core';
import {
  Router
} from '@angular/router';
import { UserService } from '../User.service';

@Injectable({ providedIn: 'root' })
export class UserLoggedInActivateService {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    return this.userService.isLoggedIn();

  }
}
