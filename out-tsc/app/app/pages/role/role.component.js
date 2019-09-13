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
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { SharedService } from '../../layouts/shared-service';
import { RoleService } from './role.service';
var RoleComponent = (function () {
    function RoleComponent(service, fb, _sharedService, 
        // private dialogService: ConfirmDialogService,
        fsb) {
        this.service = service;
        this.fb = fb;
        this._sharedService = _sharedService;
        this.fsb = fsb;
        this.pageTitle = 'Roles';
        this.formStatus = 'list';
        this.objList = {};
        this.obj = {};
        this.selectedRole = 1;
        this.config = TreeviewConfig.create({
            hasAllCheckBox: true,
            // hasFilter: true,
            hasCollapseExpand: true,
            decoupleChildFromParent: false,
            maxHeight: 420
        });
        this.numRecords = 15;
        this.pageIndex = 0;
        this._sharedService.emitChange(this.pageTitle);
    }
    RoleComponent.prototype.ngOnInit = function () {
        this.getObjList();
        this.initFormSearch();
        this.items = [];
    };
    RoleComponent.prototype.initForm = function () {
        this.selectedFiles = {};
        this.f = this.fb.group({
            'id': this.obj.id,
            'role_name': [this.obj.role_name, Validators.required],
            'description': [this.obj.description]
        });
    };
    RoleComponent.prototype.initFormSearch = function () {
        this.fs = this.fsb.group({
            'query': this.queryString
        });
    };
    RoleComponent.prototype.getObjList = function () {
        this.pageIndex = 0;
        this.queryData();
    };
    RoleComponent.prototype.search = function (query) {
        this.queryString = query.query;
        this.pageIndex = 0;
        this.queryData();
    };
    RoleComponent.prototype.pageEvent = function (event) {
        this.numRecords = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.queryData();
    };
    RoleComponent.prototype.queryData = function () {
        var _this = this;
        this.service.list(this.queryString, this.numRecords, this.numRecords * this.pageIndex).subscribe(function (data) { _this.objList = data; }, function (error) { return console.log(error.message); });
    };
    RoleComponent.prototype.onRoleChange = function (event) {
        var _this = this;
        if (event.value !== undefined) {
            this.selectedRole = event.value;
        }
        this.items = [];
        this.service.getMainMenu(this.selectedRole).subscribe(function (data) {
            _this.objMenuItem = data;
            // add main tree
            _this.objMenuItem.forEach(function (RM) {
                // add sub tree
                var objSubTree;
                // console.log(this.objMenuItem);
                _this.service.getSubMenu(_this.selectedRole, RM.value).subscribe(function (dataSub) {
                    objSubTree = dataSub;
                    if (objSubTree.length > 0) {
                        var mainsTree_1 = new TreeviewItem({ text: RM.text, value: RM.value, checked: RM.checked,
                            collapsed: false, children: [{ text: 'Salad', value: 21 }] });
                        objSubTree.forEach(function (RMSub) {
                            mainsTree_1.children.push(new TreeviewItem({ text: RMSub.text, value: RMSub.value, checked: RMSub.checked }));
                        });
                        mainsTree_1.children.splice(0, 1);
                        mainsTree_1.correctChecked();
                        _this.items.push(mainsTree_1);
                    }
                    else {
                        var mainsTree = new TreeviewItem({ text: RM.text, value: RM.value, checked: RM.checked, collapsed: false });
                        _this.items.push(mainsTree);
                    }
                });
            });
        }, function (error) { return console.log(error); });
    };
    RoleComponent.prototype.onSelectedChange = function (downlineItems) {
        console.log('Change');
    };
    RoleComponent.prototype.showNewForm = function () {
        this.formStatus = 'new';
        this.initForm();
    };
    RoleComponent.prototype.showAssignForm = function (obj) {
        this.formStatus = 'assign';
        this.selectedRole = obj.id;
        this.onRoleChange(this.selectedRole);
        this.initForm();
    };
    RoleComponent.prototype.cancelShowForm = function () {
        this.formStatus = 'list';
        this.obj = {};
    };
    RoleComponent.prototype.showEditForm = function (selectedObj) {
        this.formStatus = 'edit';
        this.obj = selectedObj;
        this.initForm();
    };
    RoleComponent.prototype.saveObject = function (formObj) {
        var _this = this;
        this.obj = formObj;
        if (this.formStatus === 'edit') {
            this.obj.updated_by = this._sharedService.getLoginUserId();
            this.obj.updated_date = new Date().toISOString();
            this.service.update(formObj.id, this.obj).subscribe(function (response) {
                _this.formStatus = 'list';
                _this.obj = {};
                _this.getObjList();
                _this.openSnackBar('Role was updated successfully.', 'OK');
            }, function (error) { return console.log(error); });
        }
        else {
            this.obj.created_by = this._sharedService.getLoginUserId();
            this.service.create(this.obj).subscribe(function (response) {
                _this.formStatus = 'list';
                _this.formStatus = 'list';
                _this.obj = {};
                _this.getObjList();
                _this.openSnackBar('Role was created successfully.', 'OK');
            }, function (error) { return console.log(error); });
        }
    };
    RoleComponent.prototype.saveAssignForm = function () {
        var _this = this;
        if (this.values.length > 0) {
            var user_id = this._sharedService.getLoginUserId();
            this.service.updatePermission(this.selectedRole, this.values, user_id).subscribe(function (res) {
                if (res.code === 200) {
                    // this.dialogService
                    //   .confirm('Apply permission', 'Permission was applied. Do you want to assign another role?')
                    //   .subscribe(resp => {
                    //     if (resp) {
                    //     } else {
                    //       this.formStatus = 'list'
                    //     }
                    //   })
                }
                else {
                    _this.openSnackBar(res.message, 'Close');
                }
            }, function (error) { return console.log(error); });
        }
    };
    RoleComponent.prototype.openSnackBar = function (message, action) {
        // this.snackBar.open(message, action, {
        //   duration: 2000,
        // });
    };
    RoleComponent = __decorate([
        Component({
            selector: 'app-role',
            templateUrl: './role.component.html',
            styleUrls: ['./role.component.scss']
        }),
        __metadata("design:paramtypes", [RoleService, FormBuilder, SharedService,
            FormBuilder])
    ], RoleComponent);
    return RoleComponent;
}());
export { RoleComponent };
//# sourceMappingURL=role.component.js.map