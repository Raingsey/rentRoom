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
const http_1 = require("@angular/common/http");
const base_service_1 = require("../main/base/base.service");
let UsersService = class UsersService extends base_service_1.BaseService {
    constructor(http) {
        super(http, '/MUser');
        this.http = http;
    }
    uploadUsersProfile(files, users_id) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('profiles' + i, files[i]);
        }
        formData.append('numProfile', files.length);
        formData.append('user_id', users_id);
        return this.http.post(this.userUrl + '/uploadUsers', formData);
    }
};
UsersService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map