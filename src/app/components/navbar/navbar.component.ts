import { Component, HostListener, Injector, Input, OnInit } from "@angular/core";
import { ButtonComponent } from '../button/button.component';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MatIcon } from '@angular/material/icon';
import { UserService } from "../../services/User.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterLinkActive, RouterLink, MatIcon, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private screenWidth: number = 0;

  private visible: boolean = true;

  protected visibleDesktop: boolean = true;

  @Input()
  public css: string = '';

  constructor(private router: Router, private injector: Injector) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if(['/', '/home', '/login'].includes(e.url)) {
          this.visible = false;
        }
      }
    });
  }

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.screenWidth = document.documentElement.clientWidth;
  }

  public get classes(): string {
    let cssClasses = [];
    if (!this.visible) {
      cssClasses.push('d-none');
    } else {
      cssClasses.push('w-100')
      if (this.css) {
        cssClasses.push(this.css);
      }
      if (this.screenWidth <= 1024) {
        cssClasses.push('sticky-bottom', 'navbar-mobile');
        this.visibleDesktop = false
      } else {
        cssClasses.push('sticky-top');
      }
    }
    return cssClasses.join(' ');
  }
}
