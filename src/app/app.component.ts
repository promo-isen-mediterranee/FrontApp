import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  url :string = '';

  constructor(location: Location) {
    this.url = location.path(true);
  }
  public get navbar() :string {
    const routesWithoutNavbar = ['/', '/home', '/login', '/register'];
    return routesWithoutNavbar.includes(this.url) ? 'd-none' : '';
  }
}
