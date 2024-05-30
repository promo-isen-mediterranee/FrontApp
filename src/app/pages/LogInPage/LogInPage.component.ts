import { Component } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectComponent } from '../../components/select/select.component';
import {
  MatFormField,
  MatError,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    ButtonComponent,
    SelectComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MatFormFieldModule, MatInputModule, provideAnimations()],
  templateUrl: './LogInPage.component.html',
  styleUrl: './LogInPage.component.css',
})
export class LogInPageComponent {
  protected username: FormControl = new FormControl('', Validators.required);
  protected password: FormControl = new FormControl('', Validators.required);

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    let time = window.sessionStorage.getItem('expiring_on');
    if (window.sessionStorage.getItem('jwt') !== null && time !== null && time > Date.now().toString()) {
      if(time < (Date.now() + 900000).toString()) {
        window.sessionStorage.setItem('expiring_on', (Date.now() + 3600000).toString());
        this.router.navigate(['/']);
        return;
      }
    }
    window.sessionStorage.removeItem('jwt');
    window.sessionStorage.removeItem('expiring_on');
  }

  public login(): void {
    if (!this.username.invalid && !this.password.invalid) {
      this.userService.getUserData(this.username.value, this.password.value);
    }
  }
}
