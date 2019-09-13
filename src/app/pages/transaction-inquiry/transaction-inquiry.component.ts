import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedService} from '../../layouts/shared-service';
import {MessageService} from 'primeng/components/common/messageservice';
import {FormBuilder} from '@angular/forms';
import {BaseComponent} from '../main/base/base.component';
import {Transaction, TransactionFilter, TransactionObj} from './transaction.model';
import {TransactionService} from './transaction.service';
import {Constant} from '../main/constant';
import {Store, Response} from '../model/store.model';
import {IRefund, RefundResponse} from '../refund/refund.model';
import {SaleForVoid} from '../void/void.model';
import {RefundService} from '../refund/refund.service';
import * as moment from 'moment';



@Component({
    selector: 'app-transaction-inquery',
    templateUrl: './transaction-inquiry.component.html',
    styleUrls: ['./transaction-inquiry.component.scss']
})
export class TransactionInquiryComponent extends BaseComponent implements OnInit {
    @Input() merchant: number;
    @Output() onActionBack = new EventEmitter();
    mObjRefund: SaleForVoid;
    mObjVoid: SaleForVoid;
    reason: string;
    currency: string;
    amount: number;
    hideBtn: boolean;
    isRemainAmount: boolean;
    less_amount: number;
    info_refund_status: boolean;
    info_cancel_status: any;
    data?: any;
    objRefund?: any;
    voidBtn: boolean;
    refundBtn: boolean;
    filter = {} as TransactionFilter;
    displayActive = false;
    comment: string;
    store_status: string;
    csvData: any;
    myOffset = 0;
    myObjList: any;
    objIntlPayment = Constant.INTERNATIONAL_PAYMENT;
    objTranTypeList = Constant.TRANSACTION_TYPES;
    objTranStatusList = Constant.TRANSACTION_STATUSES;
    objChannelList = Constant.CHANNELS;
    objTrxWorkflowList = Constant.WORKFLOWS;
    constructor(public share: SharedService
        , public fb: FormBuilder
        , public service: TransactionService
        , public serviceRefund: RefundService
        , public messageService: MessageService) {
        super();
        this.sharedService = share;
        this.pageName = 'Transaction Inquiry';
        // this.initCols();
    }
    ngOnInit() {
        this.hideBtn = false;
        this.isRemainAmount = false;
        this.voidBtn = false;
        this.refundBtn = false;
        this.objList = {} as TransactionObj;
        this.obj = {} as Transaction;
        if (this.merchant) {
            this.filter.max = this.numRecord;
            this.filter.offset = 0;
            this.myOffset = 0;
            this.filter.merchant_id = this.merchant;
            this.initFormSearch();
            this.search(this.fs.value);
        } else {
            this.initFormSearch();
            setTimeout(() => this.pageTitle('Transaction Inquiry'), 0);
        }
    }
    initObj() {
        this.obj = {} as Transaction;
    }
    initFormSearch() {
        this.fs = this.fb.group({
            partner_trans_id: this.filter.partner_trans_id,
            partner_refund_id: this.filter.partner_refund_id,
            dfs_partner_trans_id: this.filter.dfs_partner_trans_id,
            def_partner_refund_id: this.filter.dfs_partner_refund_id,
            alipay_trans_id: this.filter.alipay_trans_id,
            merchant_id: this.filter.merchant_id,
            store_id: this.filter.store_id,
            store_name: this.filter.store_name,
            device_id: this.filter.device_id,
            amount_from: this.filter.amount_from,
            amount_to: this.filter.amount_to,
            from_date: this.filter.from_date,
            to_date: this.filter.to_date,
            transaction_type: this.filter.transaction_type,
            transaction_status: this.filter.transaction_status,
            channel: this.filter.channel,
            trx_workflow: this.filter.trx_workflow,
            tran_payment_service: this.filter.tran_payment_service,
            alipay_buyer_user_id: this.filter.alipay_buyer_user_id
        });
    }
    cancelShowForm() {
        this.voidBtn = false;
        this.refundBtn = false;
        this.formStatus = 'list';
        if (this.merchant) {
            this.pageTitle('Merchant  >  Store');
        } else {
            this.pageTitle('Store');
        }
        this.obj = {} as Transaction;
    }
    pageEvent(event) {
        this.numRecord = event.rows;
        this.filter.max = this.numRecord;
        this.filter.offset = event.rows * event.page + 1;
        this.myOffset = this.filter.offset;
        this.queryData();
    }

    showDetailForm(obj: any) {
        this.formStatus = 'detail';
        this.pageTitle( this.pageName + ' detail');
        this.obj = obj;
        console.log('obj in detail ********************************************************************')
        console.log(obj)
        // check remain amount
        this.checkObjRefundRemainAmount(obj.partner_trans_id)
        const start = moment(this.obj.created_date, 'YYYY-MM-DD');
        const end = moment(new Date(), 'YYYY-MM-DD');
        const mDay =   moment.duration(end.diff(start)).asDays();

        if (mDay >= 1) {
            // hide btn
            this.hideBtn = false
        }else {
            // show btn
            this.hideBtn = true
        }
        console.log(obj);
        const user = JSON.parse(localStorage.getItem('currentUser'));
        this.service.getAccessVoidRefund(user.id, this.obj.store_id).subscribe(res => {

            console.log('****************************************** res')
            console.log(res)
            for (let i = 0; i < res.results.length; i++) {
                // console.log(res.results[i]);
                if (res.results[i].access[0] != null) {
                    const access = res.results[i].access[0];
                    if (access.access_name === 'Void') {
                        this.voidBtn = true;
                    }else if (access.access_name === 'Refund') {
                        this.refundBtn = true;
                    }
                }
            }
        })
        setTimeout(() =>  this.service.getObjPaymentForVoid(obj.partner_trans_id).subscribe(res => {
            if (res.length['0'] === 0) {
                this.voidBtn = false;
            }
        }), 0);
        setTimeout(() =>   this.service.getObjPaymentForRefund(obj.partner_trans_id).subscribe(res => {
            if (res.length['0'] === 0) {
                this.refundBtn = false;
            }
        }), 0);
    }
    search(query: any) {
        this.filter = query;
        this.filter.max = this.numRecord;
        this.filter.offset = 0;
        this.myOffset = 0;
        if (query.transaction_type) {
            this.filter.transaction_type = query.transaction_type.name;
        }
        if (query.transaction_status) {
            this.filter.transaction_status = query.transaction_status.name;
        }
        if (query.from_date) {
            this.filter.from_date = this.sharedService.dateTimeFilter(query.from_date);
        }
        if (query.to_date) {
            this.filter.to_date = this.sharedService.dateTimeFilter(query.to_date);
        }
        if (query.channel) {
            this.filter.channel = query.channel.name;
        }
        if (query.trx_workflow) {
            this.filter.trx_workflow = query.trx_workflow.name;
        }
        if (query.tran_payment_service) {
            this.filter.tran_payment_service = query.tran_payment_service.name;
        }
        console.log(this.filter);
        this.queryData();
    }
    queryData() {
        this.stopLoading = false;
        this.filter.mer_user_id = this.sharedService.getLoginUserId();
        this.log(this.filter);
        this.service.listTransaction(this.filter).subscribe(
            (data: TransactionObj) => {
                console.log(data);
                this.objList = data;
                this.myObjList = data;
                this.stopLoading = true;
                this.isNullShow = true;
            },
            (error) => this.onErrorHandler(error)
        );
    }
    onBack() {
        this.onActionBack.emit();
    }
    afterSaveSuccess(res: Response) {
        if (res.code === 200) {
            this.formStatus = 'list';
            // this.showAddUpdatedData(res.data);
            this.messageService.add({severity: 'success', summary: 'Created', detail: this.pageName + ' created successfully!'});
            this.sharedService.showLoading(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Exception', detail: res.message});
            this.sharedService.showLoading(false);
        }
    }
    afterUpdateSuccess(res) {
        if (res.code === 200) {
            this.formStatus = 'list';
            // this.showAddUpdatedData(res.data);
            this.messageService.add({severity: 'success', summary: 'Updated', detail: this.pageName + ' updated successfully!'});
            this.sharedService.showLoading(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Exception', detail: res.message});
            this.sharedService.showLoading(false);
        }
    }
    export(query: any) {
        if (this.myObjList === undefined) {
            this.filter = query;
            if (this.merchant) {
                this.filter.merchant_id = this.merchant;
            }
            this.filter.max = this.numRecord;
            this.filter.offset = this.myOffset;
            if (query.from_date) {
                this.filter.from_date = this.sharedService.dateFilter(query.from_date);
            }
            if (query.to_date) {
                this.filter.to_date = this.sharedService.dateFilter(query.to_date);
            }
            this.service.listTransaction(this.filter).subscribe(
                (res: TransactionObj) => {
                    if (res.length > 0) {
                        this.downloadCSV(res.results);
                        this.sharedService.showLoading(false);
                        this.messageService.add({severity: 'success', summary: 'Download', detail: this.pageName + ' successfully!'});
                    }else {
                        this.sharedService.showLoading(false);
                        this.messageService.add({severity: 'error', summary: 'Exception', detail: 'Table is empty!'});
                    }
                },
                (error) => this.onErrorHandler(error)
            );
        }else {
            if (this.myObjList.length > 0) {
                this.downloadCSV(this.myObjList.results);
                this.sharedService.showLoading(false);
                this.messageService.add({severity: 'success', summary: 'Download', detail: this.pageName + ' successfully!'});
            }else {
                this.sharedService.showLoading(false);
                this.messageService.add({severity: 'error', summary: 'Exception', detail: 'Table is empty!'});
            }
        }
    }
    // convert Json to CSV data in Angular2
    ConvertToCSV(objArray: any): string {
        let array;
        array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = '';

        for (const index in objArray[0]) {
            if (objArray[0].hasOwnProperty(index)) {
                row += index + ',';
            }
        }
        row = row.slice(0, -1);
        str += row + '\r\n';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (const index in array[i]) {
                if (array[i].hasOwnProperty(index)) {
                    if (line !== '') {
                        line += ','
                    }
                    line += array[i][index];
                }
            }
            str += line + '\r\n';
        }
        return str;
    }

    downloadCSV(obj) {
        this.sharedService.showLoading(true);
        const temp = [];
        const rows = [];

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp.push(obj[key])
            }
        }
        let index = 0;
        temp.forEach(item => {
            let alipay_date;
            if (item.alipay_pay_date === null) {
                alipay_date = '';
            }else {
                alipay_date =  ' ' + ( new Date(item.alipay_pay_date).toLocaleDateString() + ' ' + new Date(item.alipay_pay_date).toLocaleTimeString())
            }
            const tempRow = { ID: index += 1,
                TransactionType : item.trans_type,
                Merchant: item.mcn_name + ' [' + item.mcn_id + ']',
                Store: item.store_name + ' [' + item.store_id + ']',
                Device: item.dev_name + ' [' + item.dev_id + ']',
                PT_ID: (item.partner_trans_id === null)  ? '' : ('\'' + item.partner_trans_id)  ,
                AT_ID: (item.alipay_trans_id === null) ? '' : '\'' + item.alipay_trans_id ,
                PR_ID: (item.partner_refund_id === '') ? '' : '\'' + item.partner_refund_id ,
                Transaction_Work_Flow: item.trx_workflow,
                Channel: item.channel ,
                Alipay_Pay_Date: alipay_date,
                Created_Date: ' ' + ( new Date(item.created_date).toLocaleDateString() + ' ' + new Date(item.created_date).toLocaleTimeString()),
                Gross_Amount: item.gross_amount ,
                MDR: item.fee_rate_amount ,
                Net_Amount: item.net_amount ,
                Status: item.trans_status ,
            };
            rows.push(tempRow)
        });
        let url;
        this.csvData = this.ConvertToCSV(rows);
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        const blob = new Blob(['\ufeff', this.csvData], { type: 'text/csv' });
        url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'TransactionInquiry.csv';
        a.click();
        return true;
    }
    getObjRefund(out_trade_no) {
        this.service.getObjPaymentForRefund(out_trade_no).subscribe(res => {
            console.log('********************************** res')
            console.log(res)
            if (res.length['0'] > 0) {
                this.mObjRefund = res.results[0];
                this.showRefundForm(this.mObjRefund);
                console.log(this.mObjRefund);
            }
        })
    }

    checkObjRefundRemainAmount(out_trade_no) {
        this.service.getObjPaymentForRefund(out_trade_no).subscribe(res => {
            if (res.length['0'] > 0) {
                this.mObjRefund = res.results[0];
                this.checkRemainAmount(this.mObjRefund);
                console.log(this.mObjRefund);
            }
        })
    }

    getObjVoid(out_trade_no) {
        this.service.getObjPaymentForVoid(out_trade_no).subscribe(res => {
            console.log('********************************** res')
            console.log(res)
            if (res.length['0'] > 0) {
                this.mObjVoid = res.results[0];
                this.showVoidDialog(this.mObjVoid);
            }
        })
    }
    checkRemainAmount(obj: SaleForVoid) {
        this.serviceRefund.queryCheckRemainAmountRefund(obj.out_trade_no, obj.device.dev_id).subscribe(
            (res: RefundResponse) => {
                if (res.response.code === 200) {
                    // console.log('show btn refund')
                    this.isRemainAmount = true
                }else {
                    this.isRemainAmount = false
                    // console.log('hide btn refund')
                }
            },
            (error) => {
                console.log(error)
            }
        );
    }

    showRefundForm(obj: SaleForVoid) {
        // obj.gross_amount = (obj.gross_amount).toFixed(2);
        this.serviceRefund.queryForRefund(obj.out_trade_no, obj.device.dev_id).subscribe(
            (res: RefundResponse) => {
                console.log('Res *******************************************************')
                console.log(res)
                if (res.response.code === 200) {
                    this.sharedService.showLoading(false);
                    this.reason = null;
                    this.amount = res.data.gross_amount;
                    this.less_amount = res.data.less_amount;
                    this.currency = res.data.currency;
                    this.data = {reason: this.reason, amount: this.amount, less_amount: this.less_amount , currency: this.currency}
                    this.objRefund = obj;
                    this.info_refund_status = true;
                }else {
                    this.sharedService.showLoading(false);
                    this.messageService.add({severity: 'error', summary: 'Error', detail: res.response.message});
                }
            },
            (error) => {
                this.sharedService.showLoading(false);
                this.messageService.add({severity: 'error', summary: 'Error', detail: error.message})
            }
        );
    }

    onActionRefund(event: any) {
        this.reason = null;
        if (event.action === 'Close') {
            this.log(event.action);
            this.info_refund_status = event.status
        } else if (event.action === 'Refund') {
            console.log('obj refund ***********************');
            console.log(this.objRefund);
            this.info_refund_status = event.status;
            if (event.data) {
                this.reason = event.data.reason;
                this.amount = event.data.refund_amount;
                this.sharedService.showLoading(true);
                this.serviceRefund.createRefund(
                    event.obj.out_trade_no,
                    event.obj.device.dev_id,
                    this.amount.toString(),
                    this.sharedService.getLoginUserId().toString(),
                    this.reason).subscribe(
                    (res: IRefund) => {
                        if (res.response.code === 200) {
                            this.sharedService.showLoading(false);
                            console.log('refund result pending *************************************');
                            console.log(res.response)
                            this.approveRefund(res.response.refund_id, this.sharedService.getLoginUserId().toString());
                        }else {
                            this.sharedService.showLoading(false);
                            this.messageService.add({severity: 'error', summary: 'Error', detail: res.response.message});
                            this.log(res.response.message);
                        }
                    },
                    (error) => {
                        this.sharedService.showLoading(false);
                        this.messageService.add({severity: 'error', summary: 'Error', detail: error.message})
                    }
                );
            }
        }
    }
    approveRefund(refund_id, user_id) {
        this.serviceRefund.approve(refund_id, user_id).subscribe(
            (response: IRefund) => {
                if (response.response.code === 200) {
                    this.sharedService.showLoading(false);
                    this.messageService.add({severity: 'success', summary: 'Successful', detail: this.pageName + 'Refund has been approve successfully.'});
                }else {
                    this.sharedService.showLoading(false);
                    this.messageService.add({severity: 'error', summary: 'Error', detail: response.response.message});
                }
            },
            (error) => { this.sharedService.showLoading(false); this.messageService.add({severity: 'error', summary: 'Error', detail: error.message});
            }
        );
    }

    approveVoid(void_id, user_id) {
        this.service.approveVoid(void_id, user_id).subscribe(
            (response: any) => {
                if (response.code === 200) {
                    this.formStatus = 'list';
                    this.sharedService.showLoading(false);
                    this.messageService.add({severity: 'success', summary: 'Void has been', detail: ' approve successfully!'});
                }else {
                    this.search(this.fs.value);
                    this.sharedService.showLoading(false);
                    this.messageService.add({severity: 'error', summary: 'Exception', detail: response.message});
                }
            },
            (error) => {  this.sharedService.showLoading(false);
                this.messageService.add({severity: 'error', summary: 'Exception', detail: error.message});
            }
        );
    }

    // For Void
    showVoidDialog(data: any) {
        console.log(data)
        this.reason = null;
        this.service.check_void(data).subscribe(
            (res: any) => {
                if (res.response.code === 200) {
                    this.data = data;
                    this.info_cancel_status = true;
                }else {
                    this.info_cancel_status = false;
                    this.messageService.add({severity: 'error', summary: 'Exception', detail: res.response.message});
                }
            },
            (error) => {  this.sharedService.showLoading(false);
                this.messageService.add({severity: 'error', summary: 'Exception', detail: error.message}); }
        );
    }

    showVoidForm(obj: any) {
        if (obj.action === 'Close') {
            this.info_cancel_status = false;
            this.reason = null;
        }else {
            this.sharedService.showLoading(true);
            console.log(obj)
            this.service.mycreate(obj.data.out_trade_no, obj.data.device.dev_id, this.sharedService.getLoginUserId().toString(), obj.reason).subscribe(
                (res: any) => {
                    if (res.response.code === 200) {
                        this.info_cancel_status = false;
                        this.approveVoid(res.response.void_id, this.sharedService.getLoginUserId().toString());
                    }else {
                        this.info_cancel_status = false;
                        this.messageService.add({severity: 'error', summary: 'Exception', detail: res.response.message});
                        this.sharedService.showLoading(false);
                    }
                },
                (error) => {  this.sharedService.showLoading(false);
                    this.messageService.add({severity: 'error', summary: 'Exception', detail: error.message});
                }
            );
        }
    }


}
