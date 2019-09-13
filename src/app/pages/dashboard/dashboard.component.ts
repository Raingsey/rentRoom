import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../main/base/base.component';
import {SharedService} from '../../layouts/shared-service';
import {FormBuilder} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
    moduleId: module.id,
    selector: 'app-page-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class PageDashboardComponent extends BaseComponent implements OnInit {
    constructor(public share: SharedService
        , public fb: FormBuilder
        , public confirmDialog: ConfirmationService
        , public messageService: MessageService) {
        super();
        this.sharedService = share;
        this.pageName = 'Dashboard';
        setTimeout(() => this.pageTitle(this.pageName), 50);
    }

    ngOnInit() {

    }
}
