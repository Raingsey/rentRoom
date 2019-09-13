var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../layouts/shared-service';
var UserComponent = (function () {
    function UserComponent(service, fb, _sharedService, fsb
        // , private snackBar: MatSnackBar
    ) {
        this.service = service;
        this.fb = fb;
        this._sharedService = _sharedService;
        this.fsb = fsb;
        this.pageTitle = 'Users';
        this.formStatus = 'list';
        this.gv = 'g';
        this.objList = {};
        this.obj = {};
        this.numRecords = 15;
        this.pageIndex = 0;
        this.userStatus = [
            'Active',
            'In-Active'
        ];
        this._sharedService.emitChange(this.pageTitle);
    }
    UserComponent.prototype.ngOnInit = function () {
        this.getObjList();
        this.initFormSearch();
    };
    UserComponent.prototype.initForm = function () {
        this.f = this.fb.group({
            'id': this.obj.id,
            'name_eng': [this.obj.name_eng, Validators.compose([Validators.required, Validators.maxLength(30)])],
            // 'name_kh' : this.objApproval.name_kh,
            'email': [this.obj.email, Validators.compose([Validators.required, Validators.email])],
            'username': [this.obj.username, Validators.compose([Validators.required, Validators.maxLength(30)])],
            'password': this.formStatus === 'new' ?
                [this.obj.password, Validators.compose([Validators.required, Validators.minLength(6)])] : this.obj.password,
            'user_image': this.obj.user_image,
            'image_path': this.obj.image_path,
            'status': [this.obj.status, Validators.required],
        });
        this.ff = this.fb.group({
            'id': this.obj.id,
            'name_eng': [this.obj.name_eng],
            'name_kh': this.obj.name_kh,
            'email': [this.obj.email],
            'username': [this.obj.username],
            'user_image': this.obj.user_image,
            'image_path': this.obj.image_path,
        });
    };
    UserComponent.prototype.statusValError = function () {
        return this.f.controls['status'].hasError('required') ? 'Please select status' : '';
    };
    UserComponent.prototype.initFormSearch = function () {
        this.fs = this.fsb.group({
            'query': this.queryString
        });
    };
    UserComponent.prototype.getObjList = function () {
        this.pageIndex = 0;
        this.queryData();
    };
    UserComponent.prototype.pageEvent = function (event) {
        this.numRecords = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.queryData();
    };
    UserComponent.prototype.search = function (query) {
        this.queryString = query.query;
        this.pageIndex = 0;
        this.queryData();
    };
    UserComponent.prototype.showNewForm = function () {
        this.formStatus = 'new';
        this.initForm();
    };
    UserComponent.prototype.showEditForm = function (selecedUser) {
        this.formStatus = 'edit';
        this.gv = 'g';
        this.obj = selecedUser;
        this.obj.branch_id = 1;
        this.initForm();
    };
    UserComponent.prototype.queryData = function () {
        var _this = this;
        this.service.list(this.queryString, this.numRecords, this.numRecords * this.pageIndex).subscribe(function (data) { return _this.objList = data; }, function (error) { return console.log(error.message); });
    };
    UserComponent.prototype.showViewForm = function (selecedUser) {
        this.gv = 'v';
        this.obj = selecedUser;
        this.obj.branch_id = 1;
        if (this.obj.image_path) {
            this.imagePath = environment.apiBaseUrl1 + this.obj.image_path;
        }
        else {
            this.imagePath = 'assets/content/avatar.png';
        }
        this.initForm();
    };
    UserComponent.prototype.cancelShowForm = function () {
        this.formStatus = 'list';
        this.gv = 'g';
        this.obj = {};
    };
    UserComponent.prototype.saveObject = function (formObj) {
        var _this = this;
        if (this.formStatus === 'edit') {
            this.obj = formObj;
            this.obj.updated_by = this._sharedService.getLoginUserId();
            this.obj.updated_date = new Date().toISOString();
            this.service.update(this.obj).subscribe(function (res) {
                if (res.code === 200) {
                    _this.formStatus = 'list';
                    _this.gv = 'g';
                    _this.obj = {};
                    _this.getObjList();
                    _this.openSnackBar('User has been updated successfully.', 'Close');
                }
                else {
                    _this.openSnackBar(res.message, 'Close');
                }
            }, function (error) { return console.log(error); });
        }
        else {
            this.obj = formObj;
            this.obj.created_by = this._sharedService.getLoginUserId();
            this.obj.branch_id = 1;
            this.service.create(this.obj).subscribe(function (res) {
                if (res.code === 200) {
                    _this.formStatus = 'list';
                    _this.gv = 'g';
                    _this.obj = {};
                    _this.getObjList();
                    _this.openSnackBar('User has been saved successfully.', 'Close');
                }
                else {
                    _this.openSnackBar(res.message, 'Close');
                }
            }, function (error) { return console.log(error); });
        }
    };
    UserComponent.prototype.uploadImage = function (formObj) {
        var _this = this;
        var fileBrowser = this.fileInput.nativeElement;
        var formdata = new FormData();
        formdata.append('id', String(formObj.id));
        formdata.append('user_id', this._sharedService.getLoginUserId().toString());
        if (fileBrowser.files && fileBrowser.files[0]) {
            formdata.append('user_image', fileBrowser.files[0]);
        }
        else {
            this.openSnackBar('Please select new photo.', 'Close');
            return;
        }
        this.service.updateImage(formdata).subscribe(function (res) {
            if (res.code === 200) {
                _this.formStatus = 'list';
                _this.gv = 'g';
                _this.obj = {};
                _this.getObjList();
                _this.openSnackBar('Image profile has been upload successfully.', 'OK');
            }
            else {
                _this.openSnackBar(res.message, 'Close');
            }
        }, function (error) { return console.log(error); });
    };
    UserComponent.prototype.openSnackBar = function (message, action) {
        // this.snackBar.open(message, action, {
        //   duration: 2000,
        // });
    };
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", ElementRef)
    ], UserComponent.prototype, "fileInput", void 0);
    UserComponent = __decorate([
        Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.scss']
        }),
        __metadata("design:paramtypes", [UserService,
            FormBuilder,
            SharedService,
            FormBuilder
            // , private snackBar: MatSnackBar
        ])
    ], UserComponent);
    return UserComponent;
}());
export { UserComponent };
//# sourceMappingURL=user.component.js.map