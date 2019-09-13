var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HorizontalNavbarComponent } from './components/horizontal-navbar/horizontal-navbar.component';
import { VerticalNavbarComponent } from './components/vertical-navbar/vertical-navbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuLocalComponent } from './components/menu-local/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpModule } from '@angular/http';
var UIModule = (function () {
    function UIModule() {
    }
    UIModule = __decorate([
        NgModule({
            declarations: [
                HorizontalNavbarComponent,
                VerticalNavbarComponent,
                LogoComponent,
                MenuComponent,
                FooterComponent,
                MenuLocalComponent
            ],
            exports: [
                HorizontalNavbarComponent,
                VerticalNavbarComponent,
                LogoComponent,
                MenuComponent,
                FooterComponent,
                MenuLocalComponent
            ],
            imports: [
                CommonModule,
                RouterModule,
                HttpModule
            ]
        })
    ], UIModule);
    return UIModule;
}());
export { UIModule };
//# sourceMappingURL=ui.module.js.map