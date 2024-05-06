import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { LowerCasePipe, NgForOf } from "@angular/common";
import { RemoveSpecialCharactersPipe } from "../../pipes/removeSpecialCharacters.pipe";
import { ButtonComponent } from "../button/button.component";

export interface ChecklistItem {
  name: string,
  quantity: number,
  checked: boolean,
}

@Component({
  selector: 'app-checklist-item',
  standalone: true,
  imports: [
    NgForOf,
    RemoveSpecialCharactersPipe,
    LowerCasePipe,
    ButtonComponent
  ],
  templateUrl: './ChecklistItem.component.html',
  styleUrl: './ChecklistItem.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChecklistItemComponent {
  @Input()
  items: ChecklistItem[] = [];

  public setVisible(item: ChecklistItem) {
    item.checked = !item.checked;
    document.getElementById(new RemoveSpecialCharactersPipe().transform(item.name).toLowerCase() + "_div")?.setAttribute("checked", item.checked.toString());
  }
}
