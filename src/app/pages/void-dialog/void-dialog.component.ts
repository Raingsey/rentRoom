import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-void-dialog',
    templateUrl: './void-dialog.component.html',
    styleUrls: ['./void-dialog.component.scss']
})
export class VoidDialogComponent implements OnInit {
    @Input() display_prompt = false;
    @Output() ActionReason = new EventEmitter();
    @Input() data?: any;
    @Input() reason?: any;
    constructor() { }

    ngOnInit() {
    }
    doAction(action: string, data: any, reason: any) {
        this.ActionReason.emit({ action: action, data: data , reason: reason });
    }


}
