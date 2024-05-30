import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { MatIcon } from '@angular/material/icon';
import { UserService } from "../../../services/User.service";

@Component({
  selector: 'app-AdminPage',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage, MatIcon, NgIf],
  templateUrl: './AdminPage.component.html',
  styleUrl: './AdminPage.component.css',
})
export class AdminPageComponent {
  constructor(protected userService: UserService) {}
}
