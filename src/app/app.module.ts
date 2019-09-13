import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule, ProgressSpinnerModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes, AppRoutingModule } from './app-routing.module';

import { DefaultLayoutComponent } from './layouts/default/default.component';
import { ExtraComponent } from './layouts/extra/extra.component';
import { PagesModule } from './pages/pages.module';
import { UIModule } from './ui/ui.module';

import { AppComponent } from './app.component';
import { Global } from './helper/global';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_guards/authentication.service';
import { TokenInterceptor } from './_guards/token.interceptor';
import { ConfirmationService } from 'primeng/api';
import {RoleService} from './pages/role/role.service';
import {UserRoleService} from './pages/user-role/user-role.service';

@NgModule({
    declarations: [
        AppComponent,
        DefaultLayoutComponent,
        ExtraComponent,
    ],
    imports: [
        BrowserModule,
        AccordionModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),  // { useHash: true }),
        PagesModule,
        UIModule,
        ProgressSpinnerModule
    ],
    providers: [
        Global,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        AuthGuard,
        AuthenticationService,
        ConfirmationService,
        RoleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
