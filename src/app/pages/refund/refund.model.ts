import {Sale} from '../void/void.model';
import {Device} from '../model/device.model';
import {Merchant} from '../model/merchant.model';
import {Store} from '../model/store.model';
import {User} from '../model/user.model';



export interface IRefundObj {
    results: IRefund[],
    length: number
}

export interface IRefund {
    id: number,
    input_charset: string,
    partner_refund_id: string,
    partner_trans_id: string,
    alipay_trans_id: string,
    refund_amount: number,
    partner: string,
    service: string,
    timestamp: string,
    sign_type: string,
    sign: string,
    refund_status: string,
    created_date: string,
    approved_date: string,
    canceled_date: string,
    created_by: User,
    approved_by: User,
    canceled_by: User,
    payment: Sale,
    merchant: Merchant
    store: Store,
    device: Device,
    response: IResponse
}
export interface IResponse {
    code: number,
    message: string,
    refund_id: string
}

export interface IResponseRemain {
    code: number,
    message: string
}

export interface IRefundRequest {
    device_id: string,
    out_trade_no: string,
    refund_amount: string,
    user_id: number
}

export interface RefundFilter {
    partner_trans_id: string,
    partner_refund_id: string,
    alipay_trans_id: string,
    merchant_id: string,
    store_id: string,
    device_id: string,
    amount_from: number,
    amount_to: number,
    from_date: string,
    to_date: string,
    refund_status: string,
    channel: string,
    max: number,
    offset: number,
    tran_payment_service: String,
    transaction_type: String
}

export interface RefundResponse {
    data: RefundDetail,
    response: IResponse
}

export interface RemainAmountResponse {
    response: IResponseRemain
}

export interface RefundDetail {
    out_trade_no: string,
    alipay_trans_id: string,
    gross_amount: number,
    currency: string,
    timestamp: string,
    less_amount: number,
    alipay_pay_time: string,
    alipay_buyer_user_id: string,
    seller_id: string,
}
