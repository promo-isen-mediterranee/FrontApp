import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './ConfirmationDialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmationDialogComponentComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [ConfirmationDialogComponent],
      // providers: [MatDialogModule, MatDialogRef],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
