import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private readonly snackbar: MatSnackBar) { }

  errorMessage(message: string): void {
    const config: MatSnackBarConfig = {panelClass: 'redSnackBar', duration: 5000}
    this.snackbar.open(message, 'ERROR', config)
  }

  successMessage(message: string): void {
    const config: MatSnackBarConfig = {panelClass: 'greenSnackBar', duration: 5000}
    this.snackbar.open(message, 'OK', config)
  }
}
