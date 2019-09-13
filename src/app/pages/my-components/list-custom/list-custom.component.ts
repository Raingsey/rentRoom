import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SortEvent} from 'primeng/api';

@Component({
    selector: 'app-list-custom',
    templateUrl: './list-custom.component.html',
    styleUrls: ['./list-custom.component.scss']
})
export class ListCustomComponent implements OnInit {

    fs: FormGroup;
    @Input() searchText: string;
    @Input() data: any[];
    @Input() cols: any[];
    @Input() actionRows: any[];
    @Input() actionNew = true;
    @Input() actionSearch = true;
    @Input() actionPaginate = true;
    @Input() range = true;
    @Input() pageRows: 10;
    @Input() numRecords: 120;
    @Input() pageOptions = [2, 3, 4, 5, 6];
    @Input() pageIndex = 0;
    @Output() onActionRow = new EventEmitter();
    @Output() onActionNew = new EventEmitter();
    @Output() onActionSearch = new EventEmitter<string>();
    @Output() onActionPage = new EventEmitter<any>();

    constructor(private fg: FormBuilder) {
    }

    ngOnInit() {
    }

    doAction(action: string, data: any) {
        this.onActionRow.emit({action: action, data: data});
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

}
