import { Component, Injector, OnInit } from "@angular/core";
import { ButtonComponent } from '../../components/button/button.component';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { UserService } from "../../services/User.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage, NgIf],
  templateUrl: './HomePage.component.html',
  styleUrl: './HomePage.component.css',
})
export class HomePageComponent implements OnInit{
  constructor(private injector: Injector, private router: Router) {
  }

  protected userService = this.injector.get(UserService);
  protected userName = this.userService.getUserName();

  ngOnInit() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
