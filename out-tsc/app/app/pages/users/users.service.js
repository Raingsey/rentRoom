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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../main/base/base.service';
var UsersService = (function (_super) {
    __extends(UsersService, _super);
    function UsersService(http) {
        var _this = _super.call(this, http, '/MUser') || this;
        _this.http = http;
        return _this;
    }
    UsersService.prototype.uploadUsersProfile = function (files, users_id) {
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('profiles' + i, files[i]);
        }
        formData.append('numProfile', files.length);
        formData.append('user_id', users_id);
        return this.http.post(this.userUrl + '/uploadUsers', formData);
    };
    UsersService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], UsersService);
    return UsersService;
}(BaseService));
export { UsersService };
//# sourceMappingURL=users.service.js.map