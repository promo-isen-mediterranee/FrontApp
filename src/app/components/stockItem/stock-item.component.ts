import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-stock-item',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css',
})
export class StockItemComponent {
  @Input()
  title: string = '';

  @Input()
  room: string = '';

  @Input()
  quantity: number = 0;

  @Input()
  image: string = '';
}
