import { Component } from '@angular/core';
import { NgClass, NgOptimizedImage } from "@angular/common";
import { ButtonComponent } from "../../components/button/button.component";
import { SelectComponent } from "../../components/select/select.component";
import { MatFormField, MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule, MatLabel } from "@angular/material/input";
import { provideAnimations } from "@angular/platform-browser/animations";

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
    MatError
  ],
  providers: [
    MatFormFieldModule,
    MatInputModule,
    provideAnimations()
  ],
  templateUrl: './LogInPage.component.html',
  styleUrl: './LogInPage.component.css'
})
export class LogInPageComponent {

}
