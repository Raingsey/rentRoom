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
import { environment } from '../../../../environments/environment';
import { Global } from '../../../helper/global';
import 'rxjs/Rx';
import * as _ from 'lodash';
import { AuthenticationService } from '../../../_guards/authentication.service';
var MenuService = (function () {
    function MenuService(http, auth, gb) {
        this.http = http;
        this.auth = auth;
        this.gb = gb;
        this.menuUrl = environment.apiBaseUrl1 + '/menuItem/getMenuByUser/';
    }
    MenuService.prototype.getMenuItems = function () {
        // console.log('token inside menu service: ' + this.auth.getToken());
        // , {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken())}
        return this.http.get(this.menuUrl)
            .map(function (data) { return _.values(data); });
    };
    MenuService.prototype.getMenuItems1 = function (user) {
        // console.log('token inside menu service: ' + this.auth.getToken());
        // , {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken())}
        return this.http.get(this.menuUrl + user)
            .map(function (data) { return _.values(data); });
    };
    MenuService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, AuthenticationService, Global])
    ], MenuService);
    return MenuService;
}());
export { MenuService };
//# sourceMappingURL=menu.service.js.map