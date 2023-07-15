import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {map, Observable} from "rxjs";
import {DialogConfirmComponent, DialogData} from "../components/dialog-confirm/dialog-confirm.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private readonly dialog: MatDialog) { }

  openDialog(title: string, question: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {title: title, question: question} as DialogData
    });
    return dialogRef.afterClosed().pipe(
      map(value => !!value)
    );
  }
}
