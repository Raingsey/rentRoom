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
import { NationalityService } from './nationality.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseComponent } from '../main/base/base.component';
var NationalityComponent = (function (_super) {
    __extends(NationalityComponent, _super);
    function NationalityComponent(share, fb, service, confirmDialog, messageService) {
        var _this = _super.call(this) || this;
        _this.share = share;
        _this.fb = fb;
        _this.service = service;
        _this.confirmDialog = confirmDialog;
        _this.messageService = messageService;
        _this.sharedService = share;
        _this.pageName = 'Nationality';
        _this.initCols();
        return _this;
    }
    NationalityComponent.prototype.ngOnInit = function () {
        this.objList = {};
        this.obj = {};
        this.getObjList();
    };
    NationalityComponent.prototype.initCols = function () {
        this.cols = [
            { field: 'nationality', class: 'p40', header: 'Nationality' }
        ];
    };
    NationalityComponent.prototype.initObj = function () {
        this.obj = {};
    };
    NationalityComponent.prototype.initForm = function () {
        this.f = this.fb.group({
            id: this.obj.id,
            nationality: [this.obj.nationality, Validators.required]
        });
    };
    NationalityComponent = __decorate([
        Component({
            selector: 'app-nationality',
            templateUrl: './nationality.component.html',
            styleUrls: ['./nationality.component.scss']
        }),
        __metadata("design:paramtypes", [SharedService, FormBuilder,
            NationalityService,
            ConfirmationService,
            MessageService])
    ], NationalityComponent);
    return NationalityComponent;
}(BaseComponent));
export { NationalityComponent };
//# sourceMappingURL=nationality.component.js.map