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
const base_component_1 = require("../main/base/base.component");
const shared_service_1 = require("../../layouts/shared-service");
const forms_1 = require("@angular/forms");
const users_service_1 = require("./users.service");
const api_1 = require("primeng/api");
const messageservice_1 = require("primeng/components/common/messageservice");
let UsersComponent = class UsersComponent extends base_component_1.BaseComponent {
    constructor(share, fb, service, confirmDialog, messageService) {
        super();
        this.share = share;
        this.fb = fb;
        this.service = service;
        this.confirmDialog = confirmDialog;
        this.messageService = messageService;
        this.users_id = 0;
        this.sharedService = share;
        this.pageName = 'Users';
        this.initCols();
    }
    ngOnInit() {
        this.objList = {};
        this.obj = {};
        this.getObjList();
    }
    initCols() {
        this.cols = [
            { field: 'username', header: 'Username' },
        ];
    }
    initObj() {
        this.obj = {};
    }
    initialUploadButton() {
        const e1 = document.getElementById('fileProfile');
        const bl1 = e1.getElementsByTagName('button');
        this.btnUsersProfileUpload = bl1.item(1);
        // this.btnCusProfileUpload.classList.add('hide');
    }
    initForm() {
        setTimeout(() => this.initialUploadButton(), 100);
        if (this.formStatus === 'new') {
            this.f = this.fb.group({
                id: this.obj.id,
                username: [this.obj.username, forms_1.Validators.required],
                password: [this.obj.password, forms_1.Validators.required]
            });
        }
        else {
            this.f = this.fb.group({
                id: this.obj.id,
                username: [this.obj.username, forms_1.Validators.required],
                mUser_Profile: this.fb.array([this.initUsersProfileForm({})]),
            });
            this.initUsersProfileEdit();
        }
    }
    initUsersProfileForm(pro) {
        return this.fb.group({
            id: pro.id,
            file_name: pro.file_name,
            file_path: pro.file_path,
            status: pro.status
        });
    }
    deleteUsersProfile(index) {
        const control = this.f.controls['mUser_Profile'];
        control.at(index).value.status = false;
    }
    initUsersProfileEdit() {
        const controls = this.f.controls['mUser_Profile'];
        controls.removeAt(0);
        if (this.obj.mUser_Profile.length > 0) {
            this.obj.mUser_Profile.forEach(pf => {
                controls.push(this.initUsersProfileForm(pf));
            });
        }
    }
    onUploadUsersProfile(files) {
        if (files.length > 0) {
            this.service.uploadUsersProfile(files, this.users_id.toString()).subscribe(() => {
                this.endProcess();
            }, () => {
                this.endProcess();
            });
        }
        else {
            this.endProcess();
        }
    }
    initialBeforeUpdate() {
    }
    afterSaveSuccess(res) {
        this.users_id = res.id;
        this.btnUsersProfileUpload.click();
    }
    afterUpdateSuccess(res) {
        this.users_id = res.id;
        this.btnUsersProfileUpload.click();
    }
    endProcess() {
        this.formStatus = 'list';
        this.getObjList();
        this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: this.pageName + ' create successfully!'
        });
        this.sharedService.showLoading(false);
    }
    compare() {
        const pass = document.getElementById('password').value;
        const repass = document.getElementById('re-password').value;
        if (pass !== repass) {
            const string = 'Password Not Match!!!';
            document.getElementById('err_re_pass').innerHTML = string;
            document.getElementById('btnNew').disabled = true;
        }
        else {
            const string = '';
            document.getElementById('err_re_pass').innerHTML = string;
            document.getElementById('btnNew').disabled = false;
        }
    }
};
UsersComponent = __decorate([
    core_1.Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.scss']
    }),
    __metadata("design:paramtypes", [shared_service_1.SharedService,
        forms_1.FormBuilder,
        users_service_1.UsersService,
        api_1.ConfirmationService,
        messageservice_1.MessageService])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map