import { Component, HostListener, Input } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIcon } from "@angular/material/icon";

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

  constructor() {
    this.onResize()
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
    if (this.screenWidth <= 1024) {
      cssClasses.push('sticky-bottom', 'navbar-mobile');
    } else {
      cssClasses.push('sticky-top');
    }
    return cssClasses.join(' ')
  }
}
