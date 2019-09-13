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
import { ProfileService } from './profile.service';
import { SharedService } from '../../layouts/shared-service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseComponent } from '../main/base/base.component';
var ProfileComponent = (function (_super) {
    __extends(ProfileComponent, _super);
    function ProfileComponent(share, fb, service, confirmDialog, messageService) {
        var _this = _super.call(this) || this;
        _this.share = share;
        _this.fb = fb;
        _this.service = service;
        _this.confirmDialog = confirmDialog;
        _this.messageService = messageService;
        _this.sharedService = share;
        _this.pageName = 'Profile';
        _this.initCols();
        return _this;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.objList = {};
        this.obj = {};
        this.getObjList();
    };
    ProfileComponent.prototype.initCols = function () {
        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'description', header: 'Description' }
        ];
    };
    ProfileComponent.prototype.initObj = function () {
        this.obj = {};
    };
    ProfileComponent.prototype.initForm = function () {
        this.f = this.fb.group({
            id: this.obj.id,
            product: [this.obj.product, Validators.required],
            price: [this.obj.price, Validators.required],
            description: [this.obj.description, Validators.required]
        });
    };
    ProfileComponent = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss']
        }),
        __metadata("design:paramtypes", [SharedService, FormBuilder,
            ProfileService,
            ConfirmationService,
            MessageService])
    ], ProfileComponent);
    return ProfileComponent;
}(BaseComponent));
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map