import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../main/base/base.service';

@Injectable()
export class ProfileService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http, '/product');
  }

}
