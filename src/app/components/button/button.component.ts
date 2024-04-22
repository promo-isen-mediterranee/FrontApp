import { Component, Input } from "@angular/core";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input()
  label = 'Button';

  @Input()
  type : 'normal' | 'primary' | 'secondary' | 'tertiary' = 'normal';

  public get classes(): string[] {
    const mode = this.type == 'primary' ? 'btn-primary' : this.type == 'secondary' ? 'btn-secondary' : this.type == 'tertiary' ? 'btn-tertiary' : '';

    return ['btn', mode];
  }

}
