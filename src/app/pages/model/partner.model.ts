export interface Partner {
    id: number
    partner_id: string
    partner_id_alipay: string
    partner_name: string
    partner_pre_sign: string
    partner_pre_sign_alipay: string
    partner_status: string
    partner_remark: string
    partner_note: string
    created_by: number
    updated_by: number
    updated_date: string
}
export interface PartnerObj {
    results: Partner[],
    length: number,
    response: Response
}
export interface Response {
    code: number;
    message: string;
    data: Partner;

}
export interface PartnerFilter {
    partner_id: string,
    partner_name: string,
    partner_status: string,
    max: number,
    offset: number
}


