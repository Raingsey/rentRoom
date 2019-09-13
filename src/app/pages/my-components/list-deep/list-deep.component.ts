import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortEvent } from 'primeng/api';
import {Constant} from '../../main/constant';

@Component({
    selector: 'app-list-deep',
    templateUrl: './list-deep.component.html'
})
export class ListDeepComponent implements OnInit {
    @Input() stopLoading: boolean;
    @Input() isNullShow: boolean;
    @Input() data: any[];
    @Input() cols: any[];
    @Input() actionRows: any[];
    @Input() actionRowsCustom: any[];
    @Input() actionRowsVoidReject: any[];
    @Input() showList = true;
    @Input() actionPaginate = true;
    @Input() range = true;
    @Input() pageRows: 10;
    @Input() numRecords: 120;
    @Input() pageOptions = [10, 25, 50, 100];
    @Input() pageIndex = 0;
    @Output() onActionRow = new EventEmitter();
    @Output() onActionPage = new EventEmitter<any>();
    @Input() custom_action: false;
    @Input() show_btn_approve: false;
    @Input() show_btn_cancel: false;
    @Input() show_btn_reject: false;
    @Input() batch_approve_status: false;
    @Input() download_all_status: false;
    @Input() default_action: true;
    @Input() display_dialog = false;
    colSpan: number;
    constructor() {}

    ngOnInit() {
        this.initColSpan();
    }
    initColSpan() {
        this.colSpan = this.cols.length;
        if (this.range) {
            this.colSpan = this.colSpan + 1;
        }
        if (this.actionRows.length > 0) {
            this.colSpan = this.colSpan + 1;
        }
    }
    doAction(action: string, data: any) {
        this.onActionRow.emit({ action: action, data: data });
    }
    paginate(event) {
        this.onActionPage.emit(event);
    }
    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = '';
            let value2 = '';
            if (event.field) {
                const arr = event.field.split('.');
                switch (arr.length) {
                    case 1:
                        value1 = data1[event.field];
                        value2 = data2[event.field];
                        break;
                    case 2:
                        value1 = data1[arr[0]][arr[1]];
                        value2 = data2[arr[0]][arr[1]];
                        break;
                    case 3:
                        value1 = data1[arr[0]][arr[1]][arr[2]];
                        value2 = data2[arr[0]][arr[1]][arr[2]];
                        break;
                    default:
                        value1 = data1[event.field];
                        value2 = data2[event.field];
                }
            }
            let result = null;
            if (value1 == null && value2 != null) {
                result = -1;
            } else if (value1 != null && value2 == null) {
                result = 1;
            } else if (value1 == null && value2 == null) {
                result = 0;
            } else if (typeof value1 === 'string' && typeof value2 === 'string') {
                result = value1.localeCompare(value2);
            } else {
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
            }
            return (event.order * result);
        });
    }
    statusStyle(status: String) {
        const statusObj = Constant.TRANSACTION_STATUSES.find(x => x.name === status);
        let color = '#999999';
        if (statusObj) {
            color = statusObj.bg_color;
        }
        return {
            'background-color': color,
            'color': '#FFFFFF',
            'padding': '2px 4px',
            'border-radius': '2px'
        }
    }
    userStatusStyle(status: string) {
        const statusObj = Constant.MERCHANT_USER_STATUSES.find(x => x.name === status);
        let color = '#999999';
        if (statusObj) {
            color = statusObj.bg_color;
        }
        return {
            'background-color': color,
            'color': '#FFFFFF',
            'padding': '2px 4px',
            'border-radius': '2px'
        }
    }
    myStatusStyle(status: String) {
        const statusObj = Constant.MERCHANT_STATUSES.find(x => x.name === status);
        let color = '#999999';
        if (statusObj) {
            color = statusObj.bg_color;
        }
        return {
            'background-color': color,
            'color': '#FFFFFF',
            'padding': '2px 4px',
            'border-radius': '2px'
        }

    }
    batchStatusStyle(status: String) {
        const statusObj = Constant.BATCH_STATUSES.find(x => x.name === status);
        let color = '#999999';
        if (statusObj) {
            color = statusObj.bg_color;
        }
        return {
            'background-color': color,
            'color': '#FFFFFF',
            'padding': '2px 4px',
            'border-radius': '2px'
        }

    }

}
