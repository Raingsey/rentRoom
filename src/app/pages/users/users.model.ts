import {Store} from '../model/store.model';
import {User} from '../model/user.model';
import {Merchant} from '../model/merchant.model';

export interface User {
    id: number;
    name_ng: string;
    name_kh: string;
    username: string;
    password: string;
    dob: string;
    email: string;
    status: string;
    merchant: Merchant;
    created_by_merchant: User;
    updated_by_merchant: User;
    merchant_user_access: MerchantUserAccess[];
}
export interface Gender {
    id: number;
    sex: string;
}
export interface MerchantUserObj {
    results: User[],
    length: number,
    response: Response
}

export interface AccessName {
    id: number,
    access_name: string,
    access_url: string,
    b_status: boolean
}

export interface MerchantUserAccess {
    id: number;
    b_status: boolean;
    merchant_user: User;
    access_name: AccessName;
    store: Store[];
}

export interface MerchantUserAccessStore {
    id: number,
    b_status: boolean
    merchant_user_access: MerchantUserAccess,
    store: Store
}
export interface MerchantUserFilter {
    user_id: string
    merchant: number
    merchant_id: string,
    merchant_user_name: string,
    user_status: string,
    max: number,
    offset: number
}

export interface MerchantUserResponse {
    code: number;
    message: string;
    data: User;
}
