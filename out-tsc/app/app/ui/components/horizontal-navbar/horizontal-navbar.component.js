var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
var HorizontalNavbarComponent = (function () {
    function HorizontalNavbarComponent(router) {
        this.router = router;
        this.sidebarState = new EventEmitter();
        this.compressState = new EventEmitter();
        this.openedSidebar = false;
        this.showOverlay = false;
    }
    HorizontalNavbarComponent.prototype.ngOnInit = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.userName = user.name_eng;
        if (user.image_path) {
            this.imagePath = environment.apiBaseUrl1 + user.image_path;
        }
        else {
            this.imagePath = 'assets/img/avatar.png';
            // this.imagePath = 'http://192.168.1.199:8080/assets/images/abc.png';
        }
    };
    HorizontalNavbarComponent.prototype.open = function (event) {
        var clickedComponent = event.target.closest('.nav-item');
        var items = clickedComponent.parentElement.children;
        event.preventDefault();
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('opened');
        }
        clickedComponent.classList.add('opened');
        // Add class 'show-overlay'
        this.showOverlay = true;
    };
    HorizontalNavbarComponent.prototype.close = function (event) {
        var clickedComponent = event.target;
        var items = clickedComponent.parentElement.children;
        event.preventDefault();
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('opened');
        }
        // Remove class 'show-overlay'
        this.showOverlay = false;
    };
    HorizontalNavbarComponent.prototype.openSidebar = function () {
        this.openedSidebar = !this.openedSidebar;
        this.sidebarState.emit();
    };
    HorizontalNavbarComponent.prototype.compressSidebar = function () {
        this.compressMenu = !this.compressMenu;
        this.compressState.emit();
    };
    HorizontalNavbarComponent.prototype.onLogout = function () {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
    };
    HorizontalNavbarComponent.prototype.onChangePassword = function () {
        this.router.navigate(['/app/change-password']);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HorizontalNavbarComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HorizontalNavbarComponent.prototype, "openedSidebar", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HorizontalNavbarComponent.prototype, "compressMenu", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HorizontalNavbarComponent.prototype, "sidebarState", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HorizontalNavbarComponent.prototype, "compressState", void 0);
    HorizontalNavbarComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'app-horizontal-navbar',
            templateUrl: 'horizontal-navbar.component.html',
            styleUrls: ['horizontal-navbar.component.scss'],
            host: {
                '[class.app-navbar]': 'true',
                '[class.show-overlay]': 'showOverlay'
            }
        }),
        __metadata("design:paramtypes", [Router])
    ], HorizontalNavbarComponent);
    return HorizontalNavbarComponent;
}());
export { HorizontalNavbarComponent };
//# sourceMappingURL=horizontal-navbar.component.js.map