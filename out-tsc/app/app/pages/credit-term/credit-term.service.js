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
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import * as _ from 'lodash';
var CreditTermService = (function () {
    function CreditTermService(http) {
        this.http = http;
        this.baseUrl = environment.apiBaseUrl1 + '/creditterm';
    }
    CreditTermService.prototype.get = function () {
        return this.http.get(this.baseUrl).map(function (data) { return _.values(data); });
    };
    CreditTermService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], CreditTermService);
    return CreditTermService;
}());
export { CreditTermService };
//# sourceMappingURL=credit-term.service.js.map