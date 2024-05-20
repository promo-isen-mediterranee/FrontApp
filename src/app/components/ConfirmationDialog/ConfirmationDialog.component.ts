import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-component',
  standalone: true,
  imports: [ButtonComponent, MatDialogModule],
  templateUrl: './ConfirmationDialog.component.html',
  styleUrl: './ConfirmationDialog.component.css',
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
