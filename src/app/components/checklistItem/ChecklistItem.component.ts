import { Component, Input } from '@angular/core';
import { LowerCasePipe, NgForOf } from '@angular/common';
import { RemoveSpecialCharactersPipe } from '../../pipes/removeSpecialCharacters.pipe';
import { ButtonComponent } from '../button/button.component';
import { ReservedItem } from "../../interfaces/ReservedItem";

@Component({
  selector: 'app-checklist-item',
  standalone: true,
  imports: [
    NgForOf,
    RemoveSpecialCharactersPipe,
    LowerCasePipe,
    ButtonComponent,
  ],
  templateUrl: './ChecklistItem.component.html',
  styleUrl: './ChecklistItem.component.css',
})
export class ChecklistItemComponent {
  @Input()
  items: ReservedItem[] = [];

  public setVisible(item: ReservedItem) {
    item.status = !item.status;
    document
      .getElementById(
        new RemoveSpecialCharactersPipe().transform(item.item_location.item_id.name).toLowerCase() +
          '_div',
      )
      ?.setAttribute('checked', item.status.toString());
  }
}
