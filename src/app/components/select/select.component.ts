import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

export interface SelectOptions {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  @Input()
  options: SelectOptions[] = [];

  @Input()
  label: string = '';

  @Input()
  name: string = '';

  @Input()
  id: string = '';

  @Input()
  css: string = '';
}
