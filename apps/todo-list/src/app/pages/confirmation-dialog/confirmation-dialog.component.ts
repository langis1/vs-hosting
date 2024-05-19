import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public text: string,
    private matDialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>
  ) {}

  public sendResult(confirmed: boolean): void {
    this.matDialogRef.close(confirmed);
  }
}
