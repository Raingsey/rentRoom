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
const profile_service_1 = require("./profile.service");
const shared_service_1 = require("../../layouts/shared-service");
const forms_1 = require("@angular/forms");
const api_1 = require("primeng/api");
const messageservice_1 = require("primeng/components/common/messageservice");
const base_component_1 = require("../main/base/base.component");
let ProfileComponent = class ProfileComponent extends base_component_1.BaseComponent {
    constructor(share, fb, service, confirmDialog, messageService) {
        super();
        this.share = share;
        this.fb = fb;
        this.service = service;
        this.confirmDialog = confirmDialog;
        this.messageService = messageService;
        this.sharedService = share;
        this.pageName = 'Profile';
        this.initCols();
    }
    ngOnInit() {
        this.objList = {};
        this.obj = {};
        this.getObjList();
    }
    initCols() {
        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'description', header: 'Description' }
        ];
    }
    initObj() {
        this.obj = {};
    }
    initForm() {
        this.f = this.fb.group({
            id: this.obj.id,
            product: [this.obj.product, forms_1.Validators.required],
            price: [this.obj.price, forms_1.Validators.required],
            description: [this.obj.description, forms_1.Validators.required]
        });
    }
};
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.scss']
    }),
    __metadata("design:paramtypes", [shared_service_1.SharedService, forms_1.FormBuilder,
        profile_service_1.ProfileService,
        api_1.ConfirmationService,
        messageservice_1.MessageService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map