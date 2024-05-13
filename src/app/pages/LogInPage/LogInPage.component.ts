import { Component } from '@angular/core';
import { NgClass, NgOptimizedImage } from "@angular/common";
import { ButtonComponent } from "../../components/button/button.component";
import { SelectComponent } from "../../components/select/select.component";

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass,
    ButtonComponent,
    SelectComponent
  ],
  templateUrl: './LogInPage.component.html',
  styleUrl: './LogInPage.component.css'
})
export class LogInPageComponent {

}
