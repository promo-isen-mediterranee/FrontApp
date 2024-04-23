import { Component } from '@angular/core';
import { NgClass, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './LogInPage.component.html',
  styleUrl: './LogInPage.component.css'
})
export class LogInPageComponent {

}
