import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-refund-dialog',
    templateUrl: './refund-dialog.component.html',
    styleUrls: ['./refund-dialog.component.scss']
})
export class RefundDialogComponent implements OnInit {
    @Input() display_prompt = false;
    @Output() ActionRefund = new EventEmitter();
    @Input() data?: any;
    @Input() obj?: any;
    exceed_status: boolean;
    disableRefund = true;
    amount: number;
    f: FormGroup;
    constructor(public fb: FormBuilder) { }

    ngOnInit() {
        this.f = this.fb.group({
            refund_type: ['refund'],
            refund_amount: [null],
            reason: [null, Validators.required]
        })
    }
    initForm() {
        this.f = this.fb.group({
            refund_type: null,
            refund_amount: [null],
            reason: [null, Validators.required]
        })
    }
    doAction(action: string, data: any , obj: any) {
        this.amount = +this.data.amount;
        if (data.refund_type === 'refund') {
            data.refund_amount = (this.amount).toFixed(2);
        }
        this.ActionRefund.emit({ action: action, data: data , obj: obj});
        this.f = this.fb.group({
            refund_type: ['refund'],
            refund_amount: [null],
            reason: [null, Validators.required]
        });
        this.disableRefund = true;
        this.exceed_status = false;
    }
    radioChange(status: string) {
        if (status === 'full') {
            this.f.get('refund_amount').clearValidators();
            this.f.get('refund_amount').updateValueAndValidity();
            // no validate
            this.f.value.refund_type = 'refund';
            this.setValue();
            this.disableRefund = true;
            this.exceed_status = false;
        } else if (status === 'partial') {
            this.f.get('refund_amount').setValidators([Validators.required]);
            this.f.get('refund_amount').updateValueAndValidity();
            // validate
            this.f.value.refund_type = 'partial';
            this.disableRefund = false;
        }
    }
    setValue() {
        this.f.get('refund_amount').reset();
        this.f.get('reason').reset();
    }
    validateAmount() {
        this.exceed_status = this.f.value.refund_amount > this.data.less_amount;
        console.log(this.exceed_status);
        console.log('refund amount' + this.f.value.refund_amount)
        console.log('less amount' + this.data.less_amount)
    }

}
