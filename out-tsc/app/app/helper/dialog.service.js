var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
// import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
// import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
var DialogService = (function () {
    function DialogService() {
    }
    //
    // constructor(private dialog: MatDialog) { }
    DialogService.prototype.confirm = function (title, message) {
        // let dialogRef: MatDialogRef<ConfirmDialogComponent>;
        // dialogRef = this.dialog.open(ConfirmDialogComponent);
        // dialogRef.componentInstance.title = title;
        // dialogRef.componentInstance.message = message;
        // return dialogRef.afterClosed();
        return;
    };
    DialogService.prototype.error = function (title, message) {
        // let dialogRef: MatDialogRef<ErrorDialogComponent>;
        // dialogRef = this.dialog.open(ErrorDialogComponent);
        // dialogRef.componentInstance.title = title;
        // dialogRef.componentInstance.message = message;
    };
    DialogService = __decorate([
        Injectable()
    ], DialogService);
    return DialogService;
}());
export { DialogService };
//# sourceMappingURL=dialog.service.js.map