import { Component, Input } from '@angular/core';
import { NgForOf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [NgForOf, TitleCasePipe],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css',
})
export class ToggleComponent {
  @Input()
  public items: string[] = [];

  @Input()
  public clickFunction: Function = (item: string) => {};

  protected selectedItem: string = '';

  public toggleItem(item: string) {
    this.selectedItem = item;
    this.clickFunction(item);
  }
}
