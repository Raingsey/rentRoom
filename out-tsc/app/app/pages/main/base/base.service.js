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
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { isNullOrUndefined } from 'util';
var BaseService = (function () {
    function BaseService(http, path) {
        this.http = http;
        this.userUrl = environment.apiBaseUrl1;
        this.baseUrl = environment.apiBaseUrl1;
        this.userUrl = this.userUrl + path;
    }
    BaseService.prototype.get = function (path) {
        return this.http.get(this.baseUrl + path);
    };
    BaseService.prototype.list = function (queryString, max, offset, branch) {
        var Params = new HttpParams();
        Params = Params.append('max', max.toString());
        Params = Params.append('offset', offset.toString());
        Params = Params.append('branch', branch.toString());
        if (isNullOrUndefined(queryString) || queryString === '') {
            return this.http.get(this.userUrl + '/list', { params: Params });
        }
        Params = Params.append('query', queryString);
        return this.http.get(this.userUrl + '/list', { params: Params });
    };
    BaseService.prototype.show = function (id) {
        return this.http.get(this.userUrl + '/' + id);
    };
    BaseService.prototype.update = function (obj) {
        return this.http.put(this.userUrl + '/' + obj.id, obj);
    };
    BaseService.prototype.delete = function (obj) {
        return this.http.get(this.userUrl + '/delete?id=' + obj.id);
    };
    BaseService.prototype.create = function (obj) {
        return this.http.post(this.userUrl, obj);
    };
    BaseService.prototype.getByBranch = function (path, branch) {
        var Params = new HttpParams();
        Params = Params.append('branch', branch.toString());
        return this.http.get(this.baseUrl + path, { params: Params });
    };
    BaseService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, String])
    ], BaseService);
    return BaseService;
}());
export { BaseService };
//# sourceMappingURL=base.service.js.map