import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './SuccessPage.component.html',
  styleUrl: './SuccessPage.component.css',
})
export class SuccessPageComponent {
  @Input()
  text: string = 'Successful';
}
