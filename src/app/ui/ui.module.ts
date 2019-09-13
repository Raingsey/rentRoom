import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HorizontalNavbarComponent } from './components/horizontal-navbar/horizontal-navbar.component';
import { VerticalNavbarComponent } from './components/vertical-navbar/vertical-navbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuLocalComponent} from './components/menu-local/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpModule } from '@angular/http';

@NgModule({
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
export class UIModule { }
