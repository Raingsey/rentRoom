import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared-service';

@Component({
    moduleId: module.id,
    selector: 'app-default-layout',
    templateUrl: 'default.component.html',
    styleUrls: ['../layouts.scss'],
    providers: [ SharedService ]
})
export class DefaultLayoutComponent implements OnInit {
    showLoading: any;
    pageTitle: any;
    boxed: boolean;
    compress: boolean;
    menuStyle: string;
    rtl: boolean;
    @Input() openedSidebar: boolean;

    constructor( private _sharedService: SharedService ) {
        this.openedSidebar = false;
        this.boxed = false;
        this.compress = false;
        this.menuStyle = 'style-3';
        this.rtl = false;

        _sharedService.changeEmitted$.subscribe(
            title => {
                this.pageTitle = title;
            }
        );

        _sharedService.showLoading$.subscribe(
            show => {
                this.showLoading = show;
            }
        );
    }

    ngOnInit() { }

    getClasses() {
        const menu: string = (this.menuStyle);

        return {
            ['menu-' + menu]: menu,
            'boxed': this.boxed,
            'compress-vertical-navbar': this.compress,
            'open-sidebar': this.openedSidebar,
            'rtl': this.rtl
        };
    }

    sidebarState() {
        this.openedSidebar = !this.openedSidebar;
    }

    compressState() {
        this.compress = !this.compress;
    }
}
