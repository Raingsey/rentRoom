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
import { SharedService } from '../../layouts/shared-service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from './customer.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseComponent } from '../main/base/base.component';
var CustomerComponent = (function (_super) {
    __extends(CustomerComponent, _super);
    function CustomerComponent(share, fb, service, confirmDialog, messageService) {
        var _this = _super.call(this) || this;
        _this.share = share;
        _this.fb = fb;
        _this.service = service;
        _this.confirmDialog = confirmDialog;
        _this.messageService = messageService;
        _this.customer_id = 0;
        _this.sharedService = share;
        _this.pageName = 'Customer';
        _this.initCols();
        return _this;
    }
    CustomerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.objList = {};
        this.obj = {};
        this.getObjList();
        this.service.get('/gender').subscribe(function (data) { _this.objGenderList = data; }, function (error) { return console.log(error.message); });
        this.service.get('/nationality').subscribe(function (data) { return _this.objNationalityList = data; }, function (error) { return console.log(error.message); });
    };
    CustomerComponent.prototype.initCols = function () {
        this.cols = [
            { field: 'first_name', header: 'First Name' },
            { field: 'last_name', header: 'Last Name' },
            { field: 'gender.gender', header: 'Gender' },
            { field: 'dob', pipe: 'date', header: 'Date of birth' },
            { field: 'nationality.nationality', header: 'Nationality' },
        ];
    };
    CustomerComponent.prototype.initObj = function () {
        this.obj = {};
    };
    CustomerComponent.prototype.initialUploadButton = function () {
        var e1 = document.getElementById('fileProfile');
        var bl1 = e1.getElementsByTagName('button');
        this.btnCusProfileUpload = bl1.item(1);
        // this.btnCusProfileUpload.classList.add('hide');
    };
    CustomerComponent.prototype.initDefaultData = function () {
        this.obj.gender = this.objGenderList[0];
    };
    CustomerComponent.prototype.initForm = function () {
        var _this = this;
        setTimeout(function () { return _this.initialUploadButton(); }, 100);
        if (this.formStatus === 'new') {
            this.initDefaultData();
            this.f = this.fb.group({
                id: this.obj.id,
                first_name: [this.obj.first_name, Validators.required],
                last_name: [this.obj.last_name, Validators.required],
                gender: this.obj.gender ? this.obj.gender.id : null,
                dob: this.obj.dob,
                nationality: this.obj.nationality
            });
        }
        else {
            this.f = this.fb.group({
                id: this.obj.id,
                first_name: [this.obj.first_name, Validators.required],
                last_name: [this.obj.last_name, Validators.required],
                gender: this.obj.gender.id,
                dob: this.obj.dob ? moment(this.obj.dob).format('DD-MMM-YYYY') : null,
                nationality: this.obj.nationality,
                customer_profiles: this.fb.array([this.initCustomerProfileForm({})]),
            });
            this.initCustomerProfileEdit();
        }
    };
    CustomerComponent.prototype.initCustomerProfileForm = function (pro) {
        return this.fb.group({
            id: pro.id,
            file_name: pro.file_name,
            file_path: pro.file_path,
            status: pro.status
        });
    };
    CustomerComponent.prototype.deleteCustomerProfile = function (index) {
        var control = this.f.controls['customer_profiles'];
        control.at(index).value.status = false;
    };
    CustomerComponent.prototype.initCustomerProfileEdit = function () {
        var _this = this;
        var controls = this.f.controls['customer_profiles'];
        controls.removeAt(0);
        if (this.obj.customer_profiles.length > 0) {
            this.obj.customer_profiles.forEach(function (pf) {
                controls.push(_this.initCustomerProfileForm(pf));
            });
        }
    };
    CustomerComponent.prototype.onUploadCusProfile = function (files) {
        var _this = this;
        if (files.length > 0) {
            this.service.uploadProfile(files, this.customer_id.toString()).subscribe(function () {
                _this.endProcess();
            }, function () {
                _this.endProcess();
            });
        }
        else {
            this.endProcess();
        }
    };
    CustomerComponent.prototype.initialBeforeUpdate = function () {
        var _this = this;
        this.obj.dob = this.obj.dob ? new Date(this.obj.dob).toISOString() : null;
        this.obj.gender = this.objGenderList.find(function (x) { return x.id === _this.obj.gender.id; });
    };
    CustomerComponent.prototype.afterSaveSuccess = function (res) {
        this.customer_id = res.id;
        this.btnCusProfileUpload.click();
    };
    CustomerComponent.prototype.afterUpdateSuccess = function (res) {
        this.customer_id = res.id;
        this.btnCusProfileUpload.click();
    };
    CustomerComponent.prototype.endProcess = function () {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: this.pageName + ' create successfully!' });
        this.sharedService.showLoading(false);
    };
    CustomerComponent = __decorate([
        Component({
            selector: 'app-customer',
            templateUrl: './customer.component.html',
            styleUrls: ['./customer.component.scss']
        }),
        __metadata("design:paramtypes", [SharedService,
            FormBuilder,
            CustomerService,
            ConfirmationService,
            MessageService])
    ], CustomerComponent);
    return CustomerComponent;
}(BaseComponent));
export { CustomerComponent };
//# sourceMappingURL=customer.component.js.map