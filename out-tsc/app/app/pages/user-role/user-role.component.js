var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import { DateAdapter, MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { SharedService } from '../../layouts/shared-service';
import { UserRoleService } from './user-role.service';
import { UserService } from '../user/user.service';
var UserRoleComponent = (function () {
    function UserRoleComponent(service, fb, _sharedService
        // , private dialogService: ConfirmDialogService
        , userSevice
        // , private snackBar: MatSnackBar
    ) {
        this.service = service;
        this.fb = fb;
        this._sharedService = _sharedService;
        this.userSevice = userSevice;
        this.pageTitle = 'User Roles';
        this.selectedUser = 1;
        this.srv = environment.apiBaseUrl1;
        this.config = TreeviewConfig.create({
            hasAllCheckBox: true,
            // hasFilter: true,
            // hasCollapseExpand: true,
            decoupleChildFromParent: false,
            maxHeight: 420
        });
        this._sharedService.emitChange(this.pageTitle);
    }
    UserRoleComponent.prototype.ngOnInit = function () {
        this.getObjList();
        this.items = [];
        this.onUserChange(this.selectedUser);
    };
    UserRoleComponent.prototype.initForm = function () { };
    UserRoleComponent.prototype.getObjList = function () {
        var _this = this;
        this.userSevice.get().subscribe(function (data) { _this.objUserList = data; _this.selectedUser = _this.objUserList[0].id; }, function (error) { return console.log(error); });
    };
    UserRoleComponent.prototype.onUserChange = function (event) {
        var _this = this;
        if (event.value !== undefined) {
            this.selectedUser = event.value;
        }
        this.items = [];
        this.service.getRoleByUser(this.selectedUser).subscribe(function (data) {
            _this.objUserRoleList = data;
            _this.objUserRoleList.forEach(function (Role) {
                var mainsTree = new TreeviewItem({ text: Role.role_name, value: Role.id, checked: Role.checked, collapsed: false });
                _this.items.push(mainsTree);
            });
        }, function (error) { return console.log(error); });
    };
    UserRoleComponent.prototype.saveAssignForm = function () {
        var _this = this;
        if (this.values.length > 0) {
            var user_id = this._sharedService.getLoginUserId();
            this.service.updateRole(this.selectedUser, this.values, user_id).subscribe(function (res) {
                if (res.code === 200) {
                    _this.openSnackBar('User role was applied successfully.', 'OK');
                }
                else {
                    _this.openSnackBar(res.message, 'Close');
                }
            }, function (error) { return console.log(error); });
        }
    };
    UserRoleComponent.prototype.openSnackBar = function (message, action) {
        // this.snackBar.open(message, action, {
        //   duration: 3000,
        // });
    };
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], UserRoleComponent.prototype, "fileInput", void 0);
    UserRoleComponent = __decorate([
        Component({
            selector: 'app-user-role',
            templateUrl: './user-role.component.html',
            styleUrls: ['./user-role.component.scss']
        }),
        __metadata("design:paramtypes", [UserRoleService, FormBuilder, SharedService
            // , private dialogService: ConfirmDialogService
            ,
            UserService
            // , private snackBar: MatSnackBar
        ])
    ], UserRoleComponent);
    return UserRoleComponent;
}());
export { UserRoleComponent };
//# sourceMappingURL=user-role.component.js.map