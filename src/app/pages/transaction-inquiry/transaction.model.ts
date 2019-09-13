import {Merchant} from '../model/merchant.model';
import {Store} from '../model/store.model';
import {Device} from '../model/device.model';


export interface SaleObj {
    results: Sale[],
    length: number
}

export interface TransactionObj {
    results: Transaction[];
    length: number;
}

export interface Transaction {
    id: number;
    trans_type: string;
    partner_trans_id: string;
    dfs_partner_trans_id: string;
    dfs_partner_refund_id: string;
    alipay_trans_id: string;
    partner_refund_id: string;
    alipay_buyer_user_id: string;
    mcn_id: string;
    mcn_name: string;
    store_id: string;
    store_name: string;
    store_mcc: string;
    dev_id: string;
    dev_name: string;
    timestamp: string;
    created_date: string;
    gross_amount: number;
    fee_rate_amount: number;
    trans_status: string;
    error_code: string;
    error_message: string;
    remark: string;
    net_amount: number;
    trans_date: string;
    alipay_pay_date: string;
    tran_payment_service: string;
    confirm_mode: string;
}

export interface Sale {
    id: number;
    input_charset: string;
    body: string;
    currency: string;
    extend_params: string;
    notify_url: string;
    token: string;
    out_trade_no: string;
    alipay_trans_id: string;
    partner: string;
    price: number;
    product_code: number;
    quantity: number;
    service: string;
    show_url: string;
    subject: string;
    gross_amount: number;
    trans_currency: string;
    pre_sign: string;
    gateway: string;
    sign_type: string;
    sign: string;
    timestamp: string;
    seller_id: string;
    seller_email: string;
    goods_detail: string;
    it_b_pay: string;
    fee_rate_type: string;
    fee_rate_percent: number;
    fee_rate_amount: number;
    payment_status: string;
    created_date: string;
    merchant: Merchant;
    store: Store;
    device: Device;
    payment_device_id: string;
}

export interface TransactionFilter {
    mer_user_id: string;
    partner_trans_id: string;
    partner_refund_id: string;
    dfs_partner_trans_id: string;
    dfs_partner_refund_id: string;
    alipay_trans_id: string;
    merchant_id: number;
    store_id: number;
    store_name: string;
    device_id: number;
    transaction_type: string;
    transaction_status: string;
    amount_from: number;
    amount_to: number;
    from_date: string;
    to_date: string;
    channel: string;
    trx_workflow: string;
    max: number;
    offset: number;
    tran_payment_service: string;
    alipay_buyer_user_id: string;
}
