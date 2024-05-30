import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/User.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './LogOutPage.component.html',
  styleUrl: './LogOutPage.component.css'
})
export class LogOutPageComponent implements OnInit{
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }
}
