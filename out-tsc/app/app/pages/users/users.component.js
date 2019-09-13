var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { BaseComponent } from '../main/base/base.component';
import { SharedService } from '../../layouts/shared-service';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
var UsersComponent = (function (_super) {
    __extends(UsersComponent, _super);
    function UsersComponent(share, fb, service, confirmDialog, messageService) {
        var _this = _super.call(this) || this;
        _this.share = share;
        _this.fb = fb;
        _this.service = service;
        _this.confirmDialog = confirmDialog;
        _this.messageService = messageService;
        _this.users_id = 0;
        _this.sharedService = share;
        _this.pageName = 'Users';
        _this.initCols();
        return _this;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.objList = {};
        this.obj = {};
        this.getObjList();
    };
    UsersComponent.prototype.initCols = function () {
        this.cols = [
            { field: 'username', header: 'Username' },
        ];
    };
    UsersComponent.prototype.initObj = function () {
        this.obj = {};
    };
    UsersComponent.prototype.initialUploadButton = function () {
        var e1 = document.getElementById('fileProfile');
        var bl1 = e1.getElementsByTagName('button');
        this.btnUsersProfileUpload = bl1.item(1);
        // this.btnCusProfileUpload.classList.add('hide');
    };
    UsersComponent.prototype.initForm = function () {
        var _this = this;
        setTimeout(function () { return _this.initialUploadButton(); }, 100);
        if (this.formStatus === 'new') {
            this.f = this.fb.group({
                id: this.obj.id,
                username: [this.obj.username, Validators.required],
                password: [this.obj.password, Validators.required]
            });
        }
        else {
            this.f = this.fb.group({
                id: this.obj.id,
                username: [this.obj.username, Validators.required],
                mUser_Profile: this.fb.array([this.initUsersProfileForm({})]),
            });
            this.initUsersProfileEdit();
        }
    };
    UsersComponent.prototype.initUsersProfileForm = function (pro) {
        return this.fb.group({
            id: pro.id,
            file_name: pro.file_name,
            file_path: pro.file_path,
            status: pro.status
        });
    };
    UsersComponent.prototype.deleteUsersProfile = function (index) {
        var control = this.f.controls['mUser_Profile'];
        control.at(index).value.status = false;
    };
    UsersComponent.prototype.initUsersProfileEdit = function () {
        var _this = this;
        var controls = this.f.controls['mUser_Profile'];
        controls.removeAt(0);
        if (this.obj.mUser_Profile.length > 0) {
            this.obj.mUser_Profile.forEach(function (pf) {
                controls.push(_this.initUsersProfileForm(pf));
            });
        }
    };
    UsersComponent.prototype.onUploadUsersProfile = function (files) {
        var _this = this;
        if (files.length > 0) {
            this.service.uploadUsersProfile(files, this.users_id.toString()).subscribe(function () {
                _this.endProcess();
            }, function () {
                _this.endProcess();
            });
        }
        else {
            this.endProcess();
        }
    };
    UsersComponent.prototype.initialBeforeUpdate = function () {
    };
    UsersComponent.prototype.afterSaveSuccess = function (res) {
        this.users_id = res.id;
        this.btnUsersProfileUpload.click();
    };
    UsersComponent.prototype.afterUpdateSuccess = function (res) {
        this.users_id = res.id;
        this.btnUsersProfileUpload.click();
    };
    UsersComponent.prototype.endProcess = function () {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: this.pageName + ' create successfully!'
        });
        this.sharedService.showLoading(false);
    };
    UsersComponent.prototype.compare = function () {
        var pass = document.getElementById('password').value;
        var repass = document.getElementById('re-password').value;
        if (pass !== repass) {
            var string = 'Password Not Match!!!';
            document.getElementById('err_re_pass').innerHTML = string;
            document.getElementById('btnNew').disabled = true;
        }
        else {
            var string = '';
            document.getElementById('err_re_pass').innerHTML = string;
            document.getElementById('btnNew').disabled = false;
        }
    };
    UsersComponent = __decorate([
        Component({
            selector: 'app-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.scss']
        }),
        __metadata("design:paramtypes", [SharedService,
            FormBuilder,
            UsersService,
            ConfirmationService,
            MessageService])
    ], UsersComponent);
    return UsersComponent;
}(BaseComponent));
export { UsersComponent };
//# sourceMappingURL=users.component.js.map