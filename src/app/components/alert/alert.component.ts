import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { Alert } from "../../interfaces/Alert";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    ButtonComponent,
    NgForOf
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input()
  public alerts: Alert[] = []

}
