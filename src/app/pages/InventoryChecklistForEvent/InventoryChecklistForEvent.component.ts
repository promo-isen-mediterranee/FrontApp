import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ItemLocation } from "../../interfaces/ItemLocation";
import { ChecklistItemComponent } from "../../components/checklistItem/ChecklistItem.component";
import { NgForOf } from "@angular/common";
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from "@angular/router";
import { Event } from "../../interfaces/Event";
import { ReservedItem } from "../../interfaces/ReservedItem";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-inventory-checklist-for-event',
  standalone: true,
  imports: [ChecklistItemComponent, NgForOf, ButtonComponent, MatIcon],
  templateUrl: './InventoryChecklistForEvent.component.html',
  styleUrl: './InventoryChecklistForEvent.component.css',
})
export class InventoryChecklistForEventComponent implements OnInit {
  private apiUrl = environment.apiStockUrl;
  protected items: ItemLocation[] = [];
  protected reservedItems: ReservedItem[] = [];
  protected selectedEvent: Event = {} as Event;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedEvent = navigation.extras.state?.['selectedEvent'];
    }
  }

  ngOnInit() {
    this.httpClient
      .get<
        ReservedItem[]
      >(this.apiUrl + '/reservedItem/getAll/' + this.selectedEvent.extendedProps?.id, { withCredentials: true })
      .subscribe(
        (data) => {
          this.reservedItems = data;
        },
        (error) => {
          if(error.status === 401) {
            this.router.navigate(['/'])
          }
          throw error;
        }
      );

    this.httpClient
      .get<ItemLocation[]>(this.apiUrl + 'item/getAll', { withCredentials: true })
      .subscribe(
        (data) => {
          this.items = data;
        },
        (error) => {
          if(error.status === 401) {
            this.router.navigate(['login'])
          }
          throw error;
        }
      );

    this.httpClient
      .get<ReservedItem[]>(this.apiUrl + 'reservedItem/getAll', { withCredentials: true })
      .subscribe(
        (data) => {
          for (const itemStock of data) {
            if (
              itemStock.event.end > this.selectedEvent.start ||
              itemStock.event.start < this.selectedEvent.end
            ) {
              const index = this.items.indexOf(itemStock.item_location);
              if (index > -1) {
                this.items.splice(index, 1);
              }
            }
          }
        },
        (error) => {
          if(error.status === 401) {
            this.router.navigate(['login'])
          }
          throw error;
        }
      );
  }
}
