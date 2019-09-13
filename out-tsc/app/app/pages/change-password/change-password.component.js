var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordService } from './change-password.service';
import { SharedService } from '../../layouts/shared-service';
import { Router } from '@angular/router';
import { DialogService } from '../../helper/dialog.service';
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(service, fb, _sharedService, 
        // private snackBar: MatSnackBar,
        router, dialog) {
        this.service = service;
        this.fb = fb;
        this._sharedService = _sharedService;
        this.router = router;
        this.dialog = dialog;
        this.pageTitle = 'Change Password';
        this.userid = 0;
        this._sharedService.emitChange(this.pageTitle);
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userid = currentUser.id;
        this.f = this.fb.group({
            'id': this.userid,
            'currentPass': ['', [Validators.compose([Validators.required, Validators.minLength(6)])]],
            'newPass': ['', [Validators.compose([Validators.required, Validators.minLength(6)])]],
            'confirmNewPass': ['', Validators.required]
        }, {
            validator: CustomValidator.Match('newPass', 'confirmNewPass')
        });
    };
    ChangePasswordComponent.prototype.changePass = function (obj) {
        var _this = this;
        this.service.changePassword(obj).subscribe(function (res) {
            if (res.code === 200) {
                _this.openSnackBar('Change password successfully.', 'OK');
                localStorage.removeItem('currentUser');
                _this.router.navigate(['/auth/login']);
            }
            else {
                _this.dialog.error('Change Password Error', res.message);
            }
        }, function (error) { return _this.openSnackBar(error.message, 'Close'); });
    };
    ChangePasswordComponent.prototype.openSnackBar = function (message, action) {
        // this.snackBar.open(message, action, {
        //   duration: 3000,
        // });
    };
    ChangePasswordComponent = __decorate([
        Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html',
            styleUrls: ['./change-password.component.scss']
        }),
        __metadata("design:paramtypes", [ChangePasswordService, FormBuilder, SharedService,
            Router, DialogService])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
export { ChangePasswordComponent };
var CustomValidator = (function () {
    function CustomValidator() {
    }
    /**
     * Match two controls if they are the same
     * @param firstControlName
     * @param secondControlName
     * @returns {(AC: AbstractControl) => any}
     * @constructor
     */
    CustomValidator.Match = function (firstControlName, secondControlName) {
        return function (AC) {
            var firstControlValue = AC.get(firstControlName).value;
            var secondControlValue = AC.get(secondControlName).value;
            if (firstControlValue !== secondControlValue) {
                AC.get(secondControlName).setErrors({ MatchFields: true });
            }
            else {
                return null;
            }
        };
    };
    return CustomValidator;
}());
export { CustomValidator };
//# sourceMappingURL=change-password.component.js.map