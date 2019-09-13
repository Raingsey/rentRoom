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
const environment_1 = require("../../../../environments/environment");
const http_1 = require("@angular/common/http");
require("rxjs/Rx");
const util_1 = require("util");
let BaseService = class BaseService {
    constructor(http, path) {
        this.http = http;
        this.userUrl = environment_1.environment.apiBaseUrl1;
        this.baseUrl = environment_1.environment.apiBaseUrl1;
        this.userUrl = this.userUrl + path;
    }
    get(path) {
        return this.http.get(this.baseUrl + path);
    }
    list(queryString, max, offset, branch) {
        let Params = new http_1.HttpParams();
        Params = Params.append('max', max.toString());
        Params = Params.append('offset', offset.toString());
        Params = Params.append('branch', branch.toString());
        if (util_1.isNullOrUndefined(queryString) || queryString === '') {
            return this.http.get(this.userUrl + '/list', { params: Params });
        }
        Params = Params.append('query', queryString);
        return this.http.get(this.userUrl + '/list', { params: Params });
    }
    show(id) {
        return this.http.get(this.userUrl + '/' + id);
    }
    update(obj) {
        return this.http.put(this.userUrl + '/' + obj.id, obj);
    }
    delete(obj) {
        return this.http.get(this.userUrl + '/delete?id=' + obj.id);
    }
    create(obj) {
        return this.http.post(this.userUrl, obj);
    }
    getByBranch(path, branch) {
        let Params = new http_1.HttpParams();
        Params = Params.append('branch', branch.toString());
        return this.http.get(this.baseUrl + path, { params: Params });
    }
};
BaseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient, String])
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map