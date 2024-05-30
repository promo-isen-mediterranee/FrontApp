import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgIf } from "@angular/common";
import { AdminNavbarComponent } from "./components/adminNavbar/adminNavbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf, AdminNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private url: string = "";
  constructor(private router: Router){
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.url = e.url
      }
    });
  }

  protected navbar = this.url.includes('admin') ? "admin-navbar" : "navbar";
}
