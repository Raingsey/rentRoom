import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { CustomerComponent } from './pages/customer/customer.component';
import {NationalityComponent} from './pages/nationality/nationality.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {UsersComponent} from './pages/users/users.component';
import {TransactionInquiryComponent} from './pages/transaction-inquiry/transaction-inquiry.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {HousesComponent} from './pages/houses/houses.component';

const defaultRoutes: Routes = [
    { path: 'dashboard', component: PageDashboardComponent },
    { path: 'user', component: UserComponent},
    { path: 'role', component: RoleComponent},
    { path: 'user-role', component: UserRoleComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'nationality', component: NationalityComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'users', component: UsersComponent },
    { path: 'houses', component: HousesComponent },
];

const extraRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot', component: PageForgotComponent },
    { path: 'confirm', component: PageConfirmComponent },
    { path: 'page-404', component: Page404Component },
    { path: 'page-500', component: Page500Component },
    { path: 'change-password', component: ChangePasswordComponent },

];

export const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/auth/login',
    //     pathMatch: 'full',
    //     canActivate: [AuthGuard]
    // },
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
    // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
