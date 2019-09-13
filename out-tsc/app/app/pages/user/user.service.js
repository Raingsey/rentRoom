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
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';
import * as _ from 'lodash';
import { AuthenticationService } from '../../_guards/authentication.service';
import { isNullOrUndefined } from 'util';
var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.userUrl = environment.apiBaseUrl1 + '/user';
    }
    UserService.prototype.get = function () {
        // add authorization header with jwt token
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.get(this.userUrl)
            .map(function (data) { return _.values(data); });
        // .map(data => data.join());
    };
    UserService.prototype.list = function (queryString, max, offset) {
        var Params = new HttpParams();
        Params = Params.append('max', max.toString());
        Params = Params.append('offset', offset.toString());
        if (isNullOrUndefined(queryString) || queryString === '') {
            return this.http.get(this.userUrl + '/list', { params: Params });
        }
        Params = Params.append('query', queryString);
        return this.http.get(this.userUrl + '/list', { params: Params });
    };
    UserService.prototype.show = function (id) {
        return this.http.get(this.userUrl + '/' + id)
            .map(function (data) { return _.values(data); });
    };
    UserService.prototype.update = function (user) {
        return this.http.put(this.userUrl + '/' + user.id, user);
    };
    UserService.prototype.updateImage = function (data) {
        return this.http.post(this.userUrl + '/uploadProfile', data);
    };
    UserService.prototype.create = function (user) {
        return this.http.post(this.userUrl, user);
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, AuthenticationService])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map