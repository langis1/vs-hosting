import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  public showSuccess(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  public showError(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
