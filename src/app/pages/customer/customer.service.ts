import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../main/base/base.service';

@Injectable()
export class CustomerService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http, '/customer')
    }
    uploadProfile(files: any, customer_id: string) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('profiles' + i, files[i]);
        }
        formData.append('numProfile', files.length);
        formData.append('customer_id', customer_id);
        return this.http.post(this.userUrl + '/uploadCustomer', formData);
    }
}
