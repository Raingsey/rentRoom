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
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../_guards/authentication.service';
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService, fb) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.model = {};
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loading = false;
        this.hide = true;
        // reset login status
        this.authenticationService.logout();
        this.initForm();
    };
    LoginComponent.prototype.initForm = function () {
        this.f = this.fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        });
    };
    LoginComponent.prototype.login = function (form) {
        var _this = this;
        this.loading = true;
        this.error = '';
        this.authenticationService.login(form.username, form.password)
            .subscribe(function (result) {
            if (result === true) {
                // login successful
                // let token = response.json() && response.json().token;
                // localStorage.setItem('currentUser', JSON.stringify({ username: this.model.username, token: token }));
                _this.router.navigate(['/app/dashboard']);
            }
            else {
                // login failed
                _this.error = 'Username or password is incorrect.';
                _this.loading = false;
            }
        });
    };
    LoginComponent.prototype.gotoForgot = function () {
        this.router.navigate(['/auth/forgot']);
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [Router, AuthenticationService, FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map