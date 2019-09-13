var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MenuService } from './menu.service';
var MenuLocalComponent = (function () {
    function MenuLocalComponent(menuService) {
        this.menuService = menuService;
    }
    MenuLocalComponent.prototype.getMenuItems = function () {
        var _this = this;
        this.menuService.getMenuItems().then(function (menuItems) { return _this.menuItems = menuItems; });
    };
    MenuLocalComponent.prototype.getLiClasses = function (item, isActive) {
        return {
            'has-sub': item.sub,
            'active': item.active || isActive,
            'menu-item-group': item.groupTitle,
            'disabled': item.disabled
        };
    };
    MenuLocalComponent.prototype.getStyles = function (item) {
        return {
            'background': item.icon_bg,
            'color': item.icon_color
        };
    };
    MenuLocalComponent.prototype.ngOnInit = function () {
        this.getMenuItems();
    };
    MenuLocalComponent.prototype.toggle = function (event, item, el) {
        event.preventDefault();
        var items = el.menuItems;
        if (item.active) {
            item.active = false;
        }
        else {
            for (var i = 0; i < items.length; i++) {
                items[i].active = false;
            }
            item.active = true;
        }
    };
    MenuLocalComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'app-menu-local',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss'],
            providers: [MenuService]
        }),
        __metadata("design:paramtypes", [MenuService])
    ], MenuLocalComponent);
    return MenuLocalComponent;
}());
export { MenuLocalComponent };
//# sourceMappingURL=menu.component.js.map