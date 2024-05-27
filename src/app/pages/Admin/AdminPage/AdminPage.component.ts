import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-AdminPage',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage],
  templateUrl: './AdminPage.component.html',
  styleUrl: './AdminPage.component.css',
})
export class AdminPageComponent {}
