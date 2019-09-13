import { Injectable } from '@angular/core';
// import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
// import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
// import {ErrorDialogComponent} from './error-dialog/error-dialog.component';

@Injectable()
export class DialogService {
  //
  // constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {
    // let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    // dialogRef = this.dialog.open(ConfirmDialogComponent);
    // dialogRef.componentInstance.title = title;
    // dialogRef.componentInstance.message = message;
    // return dialogRef.afterClosed();
      return;
  }
  public error(title: string, message: string) {
    // let dialogRef: MatDialogRef<ErrorDialogComponent>;
    // dialogRef = this.dialog.open(ErrorDialogComponent);
    // dialogRef.componentInstance.title = title;
    // dialogRef.componentInstance.message = message;
  }

}
