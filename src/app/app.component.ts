import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgOptimizedImage } from "@angular/common";
import { IMSListPageComponent } from "./pages/IMSListPage/IMSListPage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgClass, IMSListPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
