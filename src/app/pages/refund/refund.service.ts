import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/Rx';
import {BaseService} from '../main/base/base.service';
import {SaleForVoidFilter, SaleForVoidObj} from '../void/void.model';
import {IRefund, IRefundObj, RefundFilter, RefundResponse, RemainAmountResponse} from './refund.model';


@Injectable()
export class RefundService extends BaseService {
    private paymentUrl = environment.apiBaseUrl1 + '/paymentTran';

    constructor(protected http: HttpClient) {
        super(http, '/refundTran');
    }
    paymentForRefund(query: SaleForVoidFilter) {
        return this.http.post<SaleForVoidObj>(this.paymentUrl + '/paymentForRefund', query);
    }
    createRefund(out_trade_no: string, device_id: string, refund_amount: string, user_id: string, reason: string) {
        const formData = new FormData();
        formData.append('out_trade_no', out_trade_no);
        formData.append('device_id', device_id);
        formData.append('refund_amount', refund_amount);
        formData.append('user_id', user_id);
        formData.append('reason', reason);
        return this.http.post<IRefund>(this.userUrl + '/create', formData);
    }
    queryForRefund(out_trade_no: string, device_id: string) {
        const formData = new FormData();
        formData.append('out_trade_no', out_trade_no);
        formData.append('device_id', device_id);
        return this.http.post<RefundResponse>(this.paymentUrl + '/queryForRefund', formData);
    }

    queryCheckRemainAmountRefund(out_trade_no: string, device_id: string) {
        const formData = new FormData();
        formData.append('out_trade_no', out_trade_no);
        formData.append('device_id', device_id);
        return this.http.post<RemainAmountResponse>(this.paymentUrl + '/checkRemainingAmount', formData);
    }
    cancel(refund_id: string, user_id: number) {
        const formData = new FormData();
        formData.append('id', refund_id);
        formData.append('user_id', user_id.toString());
        return this.http.post<IRefund>(this.userUrl + '/updateStatusToCancel', formData);
    }
    approve(refund_id: string, user_id: number) {
        const formData = new FormData();
        formData.append('id', refund_id);
        formData.append('user_id', user_id.toString());
        return this.http.post<IRefund>(this.userUrl + '/approve', formData);
    }
    listRefund(queryString: RefundFilter) {
        return this.http.post<IRefundObj>(this.userUrl + '/list', queryString);
    }
    Reject(refund_id: string, user_id: number, remark: string) {
        const formData = new FormData();
        formData.append('id', refund_id);
        formData.append('user_id', user_id.toString());
        formData.append('remark', remark.toString());
        return this.http.post<IRefund>(this.userUrl + '/notApprove', formData);
    }
}
