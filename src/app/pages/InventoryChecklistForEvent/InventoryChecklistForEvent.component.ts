import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ItemStock } from "../../interfaces/ItemStock";
import { tap } from "rxjs/operators";
import { ChecklistItemComponent } from "../../components/checklistItem/ChecklistItem.component";
import { NgForOf } from "@angular/common";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-inventory-checklist-for-event',
  standalone: true,
  imports: [
    ChecklistItemComponent,
    NgForOf,
    ButtonComponent
  ],
  templateUrl: './InventoryChecklistForEvent.component.html',
  styleUrl: './InventoryChecklistForEvent.component.css'
})
export class InventoryChecklistForEventComponent implements OnInit{
  private apiUrl = environment.apiStockUrl
  protected items : ItemStock[] = []
  protected reservedItems = []

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get<ItemStock[]>(this.apiUrl + "item/getAll")
      .pipe(
        tap((data) => {
            this.items = data
          }
        )
      )
  }

}
