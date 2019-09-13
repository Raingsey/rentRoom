export interface MerchantTypeObj {
    results: MerchantType[];
    length: number;
}

export interface MerchantType {
    id: number;
    mcn_type_name: string;
    description: string;
    created_by: number;
    updated_by: number;
    updated_date: string;
    merchant_id: number;
}
export interface Response {
    code: number;
    message: string;
    data: MerchantType;
}
