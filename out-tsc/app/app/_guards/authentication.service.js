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
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Global } from '../helper/global';
import 'rxjs/add/operator/map';
var AuthenticationService = (function () {
    function AuthenticationService(http, gb) {
        this.http = http;
        this.gb = gb;
        // set token if saved in local storage
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }
    // public getToken(): string {
    //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //   return currentUser.token;
    // }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(environment.apiBaseUrl1 + '/user/login', JSON.stringify({ username: username, password: password }))
            .map(function (response) {
            if (response.json().response.code === 200) {
                // const token = response.json();
                // this.token = token;
                _this.gb.g_user = response.json().id;
                localStorage.setItem('currentUser', JSON.stringify(response.json().data));
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthenticationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Global])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map