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
import { environment } from '../../../../environments/environment';
var BaseComponent = (function () {
    function BaseComponent() {
        this.formStatus = 'list';
        this.numRecord = 2;
        this.pageIndex = 0;
        this.baseServerPath = environment.apiBaseUrl1;
    }
    BaseComponent.prototype.pageTitle = function (title) {
        this.sharedService.emitChange(title);
    };
    BaseComponent.prototype.getObjList = function () {
        var _this = this;
        setTimeout(function () { return _this.pageTitle(_this.pageName + ' List'); }, 50);
        this.pageIndex = 0;
        this.queryData();
    };
    BaseComponent.prototype.pageEvent = function (event) {
        this.numRecord = event.rows;
        this.pageIndex = event.page;
        this.queryData();
    };
    BaseComponent.prototype.search = function (query) {
        this.queryString = query;
        this.pageIndex = 0;
        this.queryData();
    };
    BaseComponent.prototype.queryData = function () {
        var _this = this;
        this.service.list(this.queryString, this.numRecord, this.numRecord * this.pageIndex, this.sharedService.getLoginUserBranch()).subscribe(function (data) { _this.objList = data; console.log(data); }, function (error) { return console.log(error.message); });
    };
    BaseComponent.prototype.initForm = function () {
    };
    BaseComponent.prototype.initObj = function () {
    };
    BaseComponent.prototype.showNewForm = function () {
        this.formStatus = 'new';
        this.pageTitle('New ' + this.pageName);
        this.initObj();
        this.initForm();
    };
    BaseComponent.prototype.showEditForm = function (obj) {
        this.formStatus = 'edit';
        this.pageTitle('Edit ' + this.pageName);
        this.obj = obj;
        console.log(obj);
        this.initForm();
    };
    BaseComponent.prototype.showDetailForm = function (obj) {
        this.formStatus = 'detail';
        this.pageTitle(this.pageName + ' detail');
        this.obj = obj;
        console.log(obj);
    };
    BaseComponent.prototype.cancelShowForm = function () {
        this.formStatus = 'list';
        this.pageTitle(this.pageName + ' List');
        this.initObj();
    };
    BaseComponent.prototype.showDeleteForm = function (obj) {
        var _this = this;
        this.confirmDialog.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: function () {
                console.log('delete');
                console.log(obj);
                _this.service.delete(obj).subscribe(function (res) {
                    if (res.result) {
                        _this.afterDeleteSuccess(res);
                    }
                    else {
                        _this.afterDeleteFailed();
                    }
                }, function (error) { _this.afterDeleteError(error.message); });
            },
            reject: function () {
                console.log('reject');
            }
        });
    };
    BaseComponent.prototype.saveObject = function (formObj) {
        var _this = this;
        this.sharedService.showLoading(true);
        console.log(formObj);
        if (this.formStatus === 'edit') {
            this.obj = formObj;
            this.obj.created_by = this.sharedService.getLoginUserId();
            this.obj.branch = this.sharedService.getLoginUserBranch();
            this.initialBeforeUpdate();
            this.service.update(this.obj).subscribe(function (res) {
                if (res) {
                    _this.afterUpdateSuccess(res);
                }
                else {
                    _this.afterUpdateFailed();
                }
            }, function (error) { _this.afterUpdateError(error.message); });
        }
        else {
            this.obj = formObj;
            this.obj.created_by = this.sharedService.getLoginUserId();
            this.obj.branch = this.sharedService.getLoginUserBranch();
            this.initialBeforeSave();
            this.service.create(this.obj).subscribe(function (res) {
                if (res) {
                    _this.afterSaveSuccess(res);
                }
                else {
                    _this.afterSaveFailed();
                }
            }, function (error) { _this.afterSaveError(error.message); });
        }
    };
    BaseComponent.prototype.onAction = function (event) {
        if (event.action === 'Edit') {
            this.showEditForm(event.data);
        }
        else if (event.action === 'Delete') {
            this.showDeleteForm(event.data);
        }
        else if (event.action === 'Detail') {
            this.showDetailForm(event.data);
        }
    };
    BaseComponent.prototype.initialBeforeSave = function () { };
    BaseComponent.prototype.initialBeforeUpdate = function () { };
    BaseComponent.prototype.afterSaveSuccess = function (res) {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: this.pageName + ' create successfully!' });
        this.sharedService.showLoading(false);
    };
    BaseComponent.prototype.afterUpdateSuccess = function (res) {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: this.pageName + ' updated successfully!' });
        this.sharedService.showLoading(false);
    };
    BaseComponent.prototype.afterDeleteSuccess = function (res) {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: this.pageName + ' deleted successfully!' });
        this.sharedService.showLoading(false);
    };
    BaseComponent.prototype.afterSaveFailed = function () {
        this.messageService.add({ severity: 'error', summary: 'Service Error', detail: 'Server service went wrong' });
    };
    BaseComponent.prototype.afterUpdateFailed = function () {
        this.messageService.add({ severity: 'error', summary: 'Service Error', detail: 'Server service went wrong' });
    };
    BaseComponent.prototype.afterDeleteFailed = function () {
        this.messageService.add({ severity: 'error', summary: 'Service Error', detail: 'Server service went wrong' });
    };
    BaseComponent.prototype.afterSaveError = function (error) {
        console.log(error);
        this.sharedService.showLoading(false);
    };
    BaseComponent.prototype.afterUpdateError = function (error) {
        console.log(error);
        this.sharedService.showLoading(false);
    };
    BaseComponent.prototype.afterDeleteError = function (error) {
        console.log(error);
        this.sharedService.showLoading(false);
    };
    BaseComponent.prototype.getByBranch = function (path) {
        var data = [];
        this.service.getByBranch(path, this.sharedService.getLoginUserBranch()).subscribe(function (res) { return data = res; }, function (error) { return console.log(error.message); });
        return data;
    };
    BaseComponent = __decorate([
        Component({
            selector: 'app-base',
            templateUrl: './base.component.html',
            styleUrls: ['./base.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BaseComponent);
    return BaseComponent;
}());
export { BaseComponent };
//# sourceMappingURL=base.component.js.map