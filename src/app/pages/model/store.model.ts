import {Merchant} from './merchant.model';
import {Device} from './device.model';


export interface StoreObj {
    results: Store[];
    length: number;
}

export interface Store {
    id: number;
    merchant: Merchant;
    store_id: string;
    store_name: string;
    mcc: string;
    store_phone: string;
    store_email: string;
    store_address: string;
    store_note: string;
    store_status: string;
    devices: Device;
    response: Response;
    created_by: number;
    updated_by: number;
    updated_date: string;
    comment: string;
    location_code: string;
    contact_name: string;
}

export interface Response {
    code: number;
    message: string;
    data: Store;
}

export interface StoreFilter {
    merchant: number;
    store_id: string;
    store_name: string;
    store_status: string;
    max: number;
    offset: number;
}


