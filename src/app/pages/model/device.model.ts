import {Store} from './store.model';
import {Merchant} from './merchant.model';


export interface DeviceObj {
    results: Device[],
    length: number
}

export interface Device {
    id: number;
    dev_id: string;
    dev_name: string;
    dev_token: string;
    dev_note: string;
    dev_status: string;
    store: Store;
    merchant: Merchant;
    response: Response
    created_by: number;
    updated_by: number;
    updated_date: string;
    comment: string;
    qrcode: string;
    qrcode_img: string;
    dev_is_registered: boolean;
}

export interface Response {
    code: number;
    message: string;
    data: Device;
}

export interface DeviceFilter {
    store: number,
    dev_id: string,
    dev_name: string,
    dev_status: string,
    max: number,
    offset: number
}
