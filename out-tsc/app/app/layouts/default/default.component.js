var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { SharedService } from '../shared-service';
var DefaultLayoutComponent = (function () {
    function DefaultLayoutComponent(_sharedService) {
        var _this = this;
        this._sharedService = _sharedService;
        this.openedSidebar = false;
        this.boxed = false;
        this.compress = false;
        this.menuStyle = 'style-3';
        this.rtl = false;
        _sharedService.changeEmitted$.subscribe(function (title) {
            _this.pageTitle = title;
        });
        _sharedService.showLoading$.subscribe(function (show) {
            _this.showLoading = show;
        });
    }
    DefaultLayoutComponent.prototype.ngOnInit = function () { };
    DefaultLayoutComponent.prototype.getClasses = function () {
        var menu = (this.menuStyle);
        return _a = {},
            _a['menu-' + menu] = menu,
            _a['boxed'] = this.boxed,
            _a['compress-vertical-navbar'] = this.compress,
            _a['open-sidebar'] = this.openedSidebar,
            _a['rtl'] = this.rtl,
            _a;
        var _a;
    };
    DefaultLayoutComponent.prototype.sidebarState = function () {
        this.openedSidebar = !this.openedSidebar;
    };
    DefaultLayoutComponent.prototype.compressState = function () {
        this.compress = !this.compress;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DefaultLayoutComponent.prototype, "openedSidebar", void 0);
    DefaultLayoutComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'app-default-layout',
            templateUrl: 'default.component.html',
            styleUrls: ['../layouts.scss'],
            providers: [SharedService]
        }),
        __metadata("design:paramtypes", [SharedService])
    ], DefaultLayoutComponent);
    return DefaultLayoutComponent;
}());
export { DefaultLayoutComponent };
//# sourceMappingURL=default.component.js.map