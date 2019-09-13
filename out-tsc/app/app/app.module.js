var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                RouterModule.forRoot(routes),
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
                ConfirmationService
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map