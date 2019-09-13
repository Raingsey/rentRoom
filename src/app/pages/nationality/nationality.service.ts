import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../main/base/base.service';

@Injectable()
export class NationalityService extends BaseService {
    constructor(protected http: HttpClient) {
        super(http, '/nationality');
    }
}
