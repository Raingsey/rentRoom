import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx';
import {BaseService} from '../main/base/base.service';
import {Sale, TransactionFilter, TransactionObj} from './transaction.model';
import {ICancel, IResponse} from '../void/void.model';

@Injectable()
export class TransactionService extends BaseService {
    private url = environment.apiBaseUrl1 + '/paymentTran';
    private cancelUrl = environment.apiBaseUrl1 + '/cancelTran';

    constructor(public http: HttpClient) {
        super(http, '/paymentTran')
    }
    get() {
        return this.http.get<Sale[]>(this.url)
    }
    listTransaction(queryString: TransactionFilter) {
        return this.http.post<any>(this.url + '/listTransactionMerchant', queryString);
    }

    getAccessVoidRefund(user_id, store_id) {
        return this.http.post<any>(environment.apiBaseUrl1 + '/merchantUser/getAccessVoidRefund', {user_id: user_id, store_id: store_id});
    }

    getObjPaymentForRefund(out_trade_no) {
        return this.http.post<any>(this.url + '/getObjPaymentForRefund', {out_trade_no: out_trade_no});
    }

    getObjPaymentForVoid(out_trade_no) {
        return this.http.post<any>(this.url + '/getObjPaymentForVoid', {out_trade_no: out_trade_no});
    }

    check_void(data: any) {
        const formData = new FormData();
        formData.append('out_trade_no', data.out_trade_no);
        formData.append('device_id', data.device.dev_id);
        return this.http.post<ICancel>( this.url + '/queryForVoid', formData);
    }

    mycreate(out_trade_no: string, device_id: string, user_id: string, reason: string) {
        const formData = new FormData();
        formData.append('out_trade_no', out_trade_no);
        formData.append('device_id', device_id);
        formData.append('user_id', user_id);
        formData.append('reason', reason);
        return this.http.post<ICancel>(this.cancelUrl + '/create', formData);
    }

    approveVoid(cancel_id: string, user_id: number) {
        const formData = new FormData();
        formData.append('id', cancel_id);
        formData.append('user_id', user_id.toString());
        return this.http.post<IResponse>(this.cancelUrl + '/approve', formData);
    }

}
