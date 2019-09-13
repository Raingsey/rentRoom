var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default/default.component';
import { ExtraComponent } from './layouts/extra/extra.component';
import { PageDashboardComponent } from './pages/dashboard/dashboard.component';
import { PageForgotComponent } from './pages/auth-pages/forgot/forgot.component';
import { PageConfirmComponent } from './pages/auth-pages/confirm/confirm.component';
import { Page404Component } from './pages/extra-pages/page-404/page-404.component';
import { Page500Component } from './pages/extra-pages/page-500/page-500.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/auth-pages/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { RoleComponent } from './pages/role/role.component';
import { UserRoleComponent } from './pages/user-role/user-role.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { NationalityComponent } from './pages/nationality/nationality.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
var defaultRoutes = [
    { path: 'dashboard', component: PageDashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'role', component: RoleComponent },
    { path: 'user-role', component: UserRoleComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'nationality', component: NationalityComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'users', component: UsersComponent },
];
var extraRoutes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot', component: PageForgotComponent },
    { path: 'confirm', component: PageConfirmComponent },
    { path: 'page-404', component: Page404Component },
    { path: 'page-500', component: Page500Component },
];
export var routes = [
    {
        path: '',
        redirectTo: '/app/dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'app',
        component: DefaultLayoutComponent,
        canActivate: [AuthGuard],
        children: defaultRoutes
    },
    {
        path: 'auth',
        component: ExtraComponent,
        children: extraRoutes
    },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [],
            exports: [
                RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map