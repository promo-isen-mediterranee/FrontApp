import { Component } from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule
} from "@angular/material/sidenav";
import { MatNestedTreeNode, MatTree } from "@angular/material/tree";
import { NgStyle } from "@angular/common";
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatDrawerContainer,
    MatTree,
    MatNestedTreeNode,
    NgStyle,
    MatDrawer
  ],
  providers: [provideAnimations(), MatSidenavModule, BrowserAnimationsModule],
  templateUrl: './adminNavbar.component.html',
  styleUrl: './adminNavbar.component.css'
})
export class AdminNavbarComponent {
  sidenavWidth = 4;

  increase() {
    this.sidenavWidth = 15;
  }

  decrease() {
    this.sidenavWidth = 4;
  }
}
