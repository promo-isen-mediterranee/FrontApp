import { Component, HostListener, Input } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { routes } from "../../app.routes";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLinkActive,
    RouterLink,
    MatIcon
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private screenHeight : number = 0;
  private screenWidth : number = 0;

  @Input()
  public css: string = '';

  protected router : Router = {} as Router;

  constructor(router : Router) {
    this.onResize()
    this.router = router;
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  public get classes(): string {
    let cssClasses = ['w-100'];
    if (this.css) {
      cssClasses.push(this.css);
    }
    if(["/", "/home", "/login"].includes(this.router.url)) {
      cssClasses.push('d-none');
    }
    if (this.screenWidth <= 1024) {
      cssClasses.push('sticky-bottom', 'navbar-mobile');
    } else {
      cssClasses.push('sticky-top');
    }
    return cssClasses.join(' ')
  }
}
