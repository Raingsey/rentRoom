"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Subject_1 = require("rxjs/Subject");
let SharedService = class SharedService {
    constructor() {
        // Observable string sources
        this.emitChangeSource = new Subject_1.Subject();
        this.emitShowLoading = new Subject_1.Subject();
        // Observable string streams
        this.changeEmitted$ = this.emitChangeSource.asObservable();
        this.showLoading$ = this.emitShowLoading.asObservable();
    }
    // Service message commands
    emitChange(change) {
        this.emitChangeSource.next(change);
    }
    showLoading(show) {
        this.emitShowLoading.next(show);
    }
    getLoginUserId() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        // return user.id
        return 1;
    }
    getLoginUserBranch() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        // return user.id
        return 1;
    }
    getBranch() {
        return 1;
    }
    getName(obj, fieldSearch, valueSearch, fieldReturn) {
        return obj.find(x => x[fieldSearch] === valueSearch)[fieldReturn];
    }
};
SharedService = __decorate([
    core_1.Injectable()
], SharedService);
exports.SharedService = SharedService;
//# sourceMappingURL=shared-service.js.map