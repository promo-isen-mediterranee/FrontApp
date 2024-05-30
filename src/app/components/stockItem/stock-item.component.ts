import { Component, Input } from "@angular/core";
import { ButtonComponent } from '../button/button.component';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { NgClass, NgForOf, NgIf } from "@angular/common";
@Component({
  selector: 'app-stock-item',
  standalone: true,
  imports: [ButtonComponent, MatIcon, MatIconButton, NgForOf, NgIf, NgClass],
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css',
})
export class StockItemComponent {
  constructor() {
  }

  @Input()
  itemsToDisplay: any[] = [];

  @Input()
  quantityLimitedItems: any[] = [];

  @Input()
  toggleActions!: ($event: MouseEvent) => void;

  @Input()
  editItem!: (item: any) => void;

  @Input()
  deleteItem!: (item: any) => void;
}
