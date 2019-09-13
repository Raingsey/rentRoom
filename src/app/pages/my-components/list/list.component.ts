import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    fs: FormGroup;
    @Input() searchText: string;
    @Input() data: any[];
    @Input() cols: any[];
    @Input() actionRows: any[];
    @Input() actionNew = true;
    @Input() actionSearch = true;
    @Input() actionPaginate = true;
    @Input() range = true;
    @Input() pageRows = 10;
    @Input() numRecords = 120;
    @Input() pageOptions = [2, 3, 4, 5, 6];
    @Input() pageIndex = 0;
    @Output() onActionRow = new EventEmitter();
    @Output() onActionNew = new EventEmitter();
    @Output() onActionSearch = new EventEmitter<string>();
    @Output() onActionPage = new EventEmitter<any>();
    constructor(private fg: FormBuilder) {}

    ngOnInit() {
        this.initFormSearch()
    }
    initFormSearch() {
        this.fs = this.fg.group({
            'query': this.searchText
        });
    }
    doAction(action: string, data: any) {
        this.onActionRow.emit({ action: action, data: data });
    }
    newForm() {
        this.onActionNew.emit();
    }
    search(queryStr: any) {
        this.onActionSearch.emit(queryStr.query);
    }
    paginate(event) {
        this.onActionPage.emit(event);
    }
}
