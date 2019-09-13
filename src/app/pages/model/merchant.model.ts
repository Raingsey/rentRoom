import {s} from '@angular/core/src/render3';
import {Store} from './store.model';
import {Partner} from './partner.model';
import {MerchantType} from './merchant-type.model';

export interface MerchantObj {
    results: Merchant[],
    length: number,
    response: Response
}
export interface Merchant {
    id: number;
    mcn_id: string;
    mcn_pin: string;
    admin_pin: string;
    mcn_name: string;
    mcn_contact_name: string;
    mcn_email: string;
    mcn_phone: string;
    mcn_banner_path: string;
    mcn_logo_path: string;
    mcn_note: string;
    mcn_desc: string;
    mcn_cate_code: string;
    mcn_cate_code_alipay: string;
    mcn_status: string;
    merchant_type: MerchantType;
    response: Response;
    created_by: number;
    updated_by: number;
    updated_date: string;
    comment: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    stores: Store[];
    mcn_remark: string;
    mcn_shortname: string;
    mch_id_wechat: string;
    sub_mch_id: string;
    spbill_create_ip: string;
    bussiness_cate: string;
    alipay: boolean;
    wechatpay: boolean;
    is_export_file: boolean;
    flag: string;
    partner: Partner;
    online_payment: boolean;
}
export interface Response {
    code: number;
    message: string;
    data: Merchant;
}
export interface MerchantFilter {
    mcn_id: string,
    mcn_name: string,
    merchant_type: number,
    mcn_status: string,
    max: number,
    offset: number
}
export interface BusinessCategory {
    id: number;
    business_category_code: string;
    business_category_name: string;
}
export interface McnFilter {
    id: number;
    trans_type: string;
    partner_trans_id: string;
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
}
export interface McnObj {
    results: McnFilter[],
    length: number,
    response: Response
}
