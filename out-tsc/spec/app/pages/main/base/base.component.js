"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const environment_1 = require("../../../../environments/environment");
let BaseComponent = class BaseComponent {
    constructor() {
        this.formStatus = 'list';
        this.numRecord = 2;
        this.pageIndex = 0;
        this.baseServerPath = environment_1.environment.apiBaseUrl1;
    }
    pageTitle(title) {
        this.sharedService.emitChange(title);
    }
    getObjList() {
        setTimeout(() => this.pageTitle(this.pageName + ' List'), 50);
        this.pageIndex = 0;
        this.queryData();
    }
    pageEvent(event) {
        this.numRecord = event.rows;
        this.pageIndex = event.page;
        this.queryData();
    }
    search(query) {
        this.queryString = query;
        this.pageIndex = 0;
        this.queryData();
    }
    queryData() {
        this.service.list(this.queryString, this.numRecord, this.numRecord * this.pageIndex, this.sharedService.getLoginUserBranch()).subscribe((data) => { this.objList = data; console.log(data); }, (error) => console.log(error.message));
    }
    initForm() {
    }
    initObj() {
    }
    showNewForm() {
        this.formStatus = 'new';
        this.pageTitle('New ' + this.pageName);
        this.initObj();
        this.initForm();
    }
    showEditForm(obj) {
        this.formStatus = 'edit';
        this.pageTitle('Edit ' + this.pageName);
        this.obj = obj;
        console.log(obj);
        this.initForm();
    }
    showDetailForm(obj) {
        this.formStatus = 'detail';
        this.pageTitle(this.pageName + ' detail');
        this.obj = obj;
        console.log(obj);
    }
    cancelShowForm() {
        this.formStatus = 'list';
        this.pageTitle(this.pageName + ' List');
        this.initObj();
    }
    showDeleteForm(obj) {
        this.confirmDialog.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                console.log('delete');
                console.log(obj);
                this.service.delete(obj).subscribe((res) => {
                    if (res.result) {
                        this.afterDeleteSuccess(res);
                    }
                    else {
                        this.afterDeleteFailed();
                    }
                }, (error) => { this.afterDeleteError(error.message); });
            },
            reject: () => {
                console.log('reject');
            }
        });
    }
    saveObject(formObj) {
        this.sharedService.showLoading(true);
        console.log(formObj);
        if (this.formStatus === 'edit') {
            this.obj = formObj;
            this.obj.created_by = this.sharedService.getLoginUserId();
            this.obj.branch = this.sharedService.getLoginUserBranch();
            this.initialBeforeUpdate();
            this.service.update(this.obj).subscribe((res) => {
                if (res) {
                    this.afterUpdateSuccess(res);
                }
                else {
                    this.afterUpdateFailed();
                }
            }, (error) => { this.afterUpdateError(error.message); });
        }
        else {
            this.obj = formObj;
            this.obj.created_by = this.sharedService.getLoginUserId();
            this.obj.branch = this.sharedService.getLoginUserBranch();
            this.initialBeforeSave();
            this.service.create(this.obj).subscribe((res) => {
                if (res) {
                    this.afterSaveSuccess(res);
                }
                else {
                    this.afterSaveFailed();
                }
            }, (error) => { this.afterSaveError(error.message); });
        }
    }
    onAction(event) {
        if (event.action === 'Edit') {
            this.showEditForm(event.data);
        }
        else if (event.action === 'Delete') {
            this.showDeleteForm(event.data);
        }
        else if (event.action === 'Detail') {
            this.showDetailForm(event.data);
        }
    }
    initialBeforeSave() { }
    initialBeforeUpdate() { }
    afterSaveSuccess(res) {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: this.pageName + ' create successfully!' });
        this.sharedService.showLoading(false);
    }
    afterUpdateSuccess(res) {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: this.pageName + ' updated successfully!' });
        this.sharedService.showLoading(false);
    }
    afterDeleteSuccess(res) {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: this.pageName + ' deleted successfully!' });
        this.sharedService.showLoading(false);
    }
    afterSaveFailed() {
        this.messageService.add({ severity: 'error', summary: 'Service Error', detail: 'Server service went wrong' });
    }
    afterUpdateFailed() {
        this.messageService.add({ severity: 'error', summary: 'Service Error', detail: 'Server service went wrong' });
    }
    afterDeleteFailed() {
        this.messageService.add({ severity: 'error', summary: 'Service Error', detail: 'Server service went wrong' });
    }
    afterSaveError(error) {
        console.log(error);
        this.sharedService.showLoading(false);
    }
    afterUpdateError(error) {
        console.log(error);
        this.sharedService.showLoading(false);
    }
    afterDeleteError(error) {
        console.log(error);
        this.sharedService.showLoading(false);
    }
    getByBranch(path) {
        let data = [];
        this.service.getByBranch(path, this.sharedService.getLoginUserBranch()).subscribe((res) => data = res, (error) => console.log(error.message));
        return data;
    }
};
BaseComponent = __decorate([
    core_1.Component({
        selector: 'app-base',
        templateUrl: './base.component.html',
        styleUrls: ['./base.component.scss']
    }),
    __metadata("design:paramtypes", [])
], BaseComponent);
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map