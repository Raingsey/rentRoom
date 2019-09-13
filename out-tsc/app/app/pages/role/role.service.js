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
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import * as _ from 'lodash';
import { isNullOrUndefined } from 'util';
var RoleService = (function () {
    function RoleService(http) {
        this.http = http;
        this.url = environment.apiBaseUrl1 + '/role';
        this.roleMenuUrl = environment.apiBaseUrl1 + '/roleMenu';
    }
    RoleService.prototype.get = function () {
        return this.http.get(this.url)
            .map(function (data) { return _.values(data); });
    };
    RoleService.prototype.list = function (queryString, max, offset) {
        var Params = new HttpParams();
        Params = Params.append('max', max.toString());
        Params = Params.append('offset', offset.toString());
        if (isNullOrUndefined(queryString) || queryString === '') {
            return this.http.get(this.url + '/list', { params: Params });
        }
        Params = Params.append('query', queryString);
        return this.http.get(this.url + '/list', { params: Params });
    };
    RoleService.prototype.getMainMenu = function (roleId) {
        return this.http.get(this.roleMenuUrl + '/findMain/' + roleId)
            .map(function (data) { return _.values(data); });
    };
    RoleService.prototype.getSubMenu = function (roleId, parent_id) {
        return this.http.get(this.roleMenuUrl + '/findSub/' + roleId + '/' + parent_id)
            .map(function (data) { return _.values(data); });
    };
    RoleService.prototype.update = function (id, obj) {
        return this.http.put(this.url + '/' + id, obj);
    };
    RoleService.prototype.updatePermission = function (roleId, permissions, user_id) {
        return this.http.post(this.roleMenuUrl + '/updatePermission', { roleId: roleId, permissions: permissions, user_id: user_id });
    };
    RoleService.prototype.create = function (obj) {
        // const headers = new HttpHeaders();
        // headers.append('Content-Type', undefined);
        // headers.append('Accept', 'application/json');
        // return this.http.post(this.url, obj, {headers: headers});
        return this.http.post(this.url, obj);
    };
    RoleService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], RoleService);
    return RoleService;
}());
export { RoleService };
//# sourceMappingURL=role.service.js.map