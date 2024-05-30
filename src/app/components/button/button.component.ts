import { Component, Input, SecurityContext } from "@angular/core";
import { NgClass } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input()
  label: string = '';

  @Input()
  icon: string = '';

  @Input()
  type: 'normal' | 'primary' | 'secondary' | 'tertiary' = 'normal';

  @Input()
  solid: boolean = false;

  @Input()
  css: string = '';

  @Input()
  onClickLink: string = '';

  @Input()
  disabled: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
  }

  public get classes(): string[] {
    const mode =
      this.type == 'primary'
        ? 'btn-primary'
        : this.type == 'secondary'
          ? 'btn-secondary'
          : this.type == 'tertiary'
            ? 'btn-tertiary'
            : '';

    return ['btn', mode, this.solid ? 'btn-solid' : '', this.css];
  }

  public clickFunction() {
    const link = this.sanitizer.sanitize(SecurityContext.URL, this.onClickLink);
    if (this.onClickLink != '' && link != null) {
      document.location.href = link
    }
  }
}
