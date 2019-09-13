var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var SharedService = (function () {
    function SharedService() {
        // Observable string sources
        this.emitChangeSource = new Subject();
        this.emitShowLoading = new Subject();
        // Observable string streams
        this.changeEmitted$ = this.emitChangeSource.asObservable();
        this.showLoading$ = this.emitShowLoading.asObservable();
    }
    // Service message commands
    SharedService.prototype.emitChange = function (change) {
        this.emitChangeSource.next(change);
    };
    SharedService.prototype.showLoading = function (show) {
        this.emitShowLoading.next(show);
    };
    SharedService.prototype.getLoginUserId = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        // return user.id
        return 1;
    };
    SharedService.prototype.getLoginUserBranch = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        // return user.id
        return 1;
    };
    SharedService.prototype.getBranch = function () {
        return 1;
    };
    SharedService.prototype.getName = function (obj, fieldSearch, valueSearch, fieldReturn) {
        return obj.find(function (x) { return x[fieldSearch] === valueSearch; })[fieldReturn];
    };
    SharedService = __decorate([
        Injectable()
    ], SharedService);
    return SharedService;
}());
export { SharedService };
//# sourceMappingURL=shared-service.js.map