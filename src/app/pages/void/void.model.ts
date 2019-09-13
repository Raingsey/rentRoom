import {User} from '../model/user.model';
import {Merchant} from '../model/merchant.model';
import {Device} from '../model/device.model';
import {Store} from '../model/store.model';


export interface ICancelObj {
    results: ICancel[],
    length: number
}

export interface CancelFilter {
    out_trade_no: string,
    alipay_trans_id: string,
    merchant_id: string,
    store_id: string,
    device_id: string,
    amount_from: number,
    amount_to: number,
    from_date: string,
    to_date: string,
    cancel_status: string,
    channel: string,
    max: number,
    offset: number,
    tran_payment_service: String;
}

export interface ICancel {
    id: number,
    input_charset: string,
    out_trade_no: string,
    alipay_trans_id: string,
    partner: string,
    service: string,
    timestamp: string,
    sign_type: string,
    sign: string,
    cancel_amount: string,
    cancel_status: string,
    created_date: string,
    created_by: User,
    approved_date: string,
    approved_by: User,
    canceled_date: string,
    canceled_by: User,
    payment: Sale,
    merchant: Merchant
    store: Store,
    device: Device,
    response: IResponse
}
export interface IResponse {
    code: number,
    message: string
}
export interface ICancelRequest {
    out_trade_no: string,
    device_id: string,
    user_id: number
}

export interface SaleForVoidFilter {
    out_trade_no: string,
    alipay_trans_id: string,
    merchant_id: string,
    store_id: string,
    device_id: string,
    amount_from: number,
    amount_to: number,
    from_date: string,
    to_date: string,
    trx_workflow: any;
    max: number,
    offset: number,
    tran_payment_service: String,
    transaction_type: String
}
export interface SaleForVoidObj {
    results: SaleForVoid,
    length: number
}
export interface SaleForVoid {
    id: number,
    out_trade_no: string,
    alipay_trans_id: string,
    alipay_buyer_user_id: string,
    fee_rate_amount: number,
    gross_amount: number,
    alipay_pay_time: string,
    merchant: Merchant,
    net_amount: string,
    store: Store,
    device: Device
}
export interface Sale {
    id: number,
    input_charset: string,
    body: string,
    currency: string,
    extend_params: string,
    notify_url: string,
    token: string,
    out_trade_no: string,
    alipay_trans_id: string,
    partner: string,
    price: number,
    product_code: number,
    quantity: number,
    service: string,
    show_url: string,
    subject: string,
    total_fee: number
    trans_currency: string,
    pre_sign: string,
    gateway: string,
    sign_type: string,
    sign: string,
    timestamp: string,
    seller_id: string,
    seller_email: string,
    goods_detail: string,
    it_b_pay: string,
    fee_rate_type: string,
    fee_rate_percent: number,
    fee_rate_amount: number,
    payment_status: string,
    created_date: string,
    merchant: Merchant,
    store: Store,
    device: Device,
    payment_device_id: string
}
