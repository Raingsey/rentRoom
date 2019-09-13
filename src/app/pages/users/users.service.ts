import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../main/base/base.service';
import {environment} from '../../../environments/environment';
import {User, MerchantUserAccess, MerchantUserFilter, MerchantUserObj, MerchantUserResponse} from './users.model';
import {Store} from '../model/store.model';

@Injectable()
export class UsersService extends BaseService {
  deviceUrl = environment.apiBaseUrl1 + '/device';
  paymentTanUrl = environment.apiBaseUrl1 + '/paymentTran';
  merchantUserUrl = environment.apiBaseUrl1 + '/users';

  constructor(protected http: HttpClient) {
    super(http, '/users');
  }

  listMerchantUser(merchantQuery: MerchantUserFilter) {
    return this.http.post<MerchantUserObj>(this.userUrl + '/listMerchantUser', merchantQuery);
  }

  listSubMerchantUser(merchantQuery: MerchantUserFilter) {
    return this.http.post<MerchantUserObj>(this.userUrl + '/listSubMerchantUser', merchantQuery);
  }

  queryAllAccessName() {
    return this.http.get(this.userUrl + '/queryAllAccessName');
  }

  listAllStoreByMerchant(id: string) {
    return this.http.post<Store[]>(this.userUrl + '/listAllStoreByMerchant', {id: id});
  }

  saveMerchantUser(merchantUser: User, accessStore: MerchantUserAccess[]) {
    return this.http.post<MerchantUserResponse>(this.userUrl + '/saveMerchantUser', {merchant_user: merchantUser, merchant_user_access: accessStore});
  }
  updateMerchantUser(merchantUser: User, accessStore: MerchantUserAccess[]) {
    return this.http.post<MerchantUserResponse>(this.userUrl + '/updateMerchantUser', {merchant_user: merchantUser, merchant_user_access: accessStore});
  }
  updateSubMerchantUser(merchantUser: User, accessStore: MerchantUserAccess[]) {
    return this.http.post<MerchantUserResponse>(this.userUrl + '/updateSubMerchantUserByMerchant', {merchant_user: merchantUser, merchant_user_access: accessStore});
  }
  changeStatus(mer_user_id: number, user_status: number, user_id: number) {
    return this.http.post<Response>(this.userUrl + '/changeStatus', {mer_user_id: mer_user_id, user_status: user_status, user_id: user_id});
  }

  listAllAccessNameByMerchantUser(user_id: number) {
    return this.http.post<any>(this.userUrl + '/getAccessNameByMerchantUser', {user_id: user_id});
  }

  getDevice(merchant_id: any) {
    return this.http.get(this.deviceUrl + '/getDevice/' + merchant_id);
  }

  downloadImg(url: any) {
    return this.http.get(this.userUrl + '/getBase64EncodedImage?url=' + url);
  }

  saveMaster(obj: any) {
    return this.http.post<any>(this.userUrl + '/saveMasterDevice', obj);
  }

  createQR(data: any) {
    const formData = {
      mcc: data.mcc,
      mcn_id: data.merchant.mcn_id,
      mcn_name: data.merchant.mcn_name,
      store_id: data.store_id,
      store_name: data.store_name,
      store_address: data.store_address,
      taxi_operation_id: data.taxi_operation_id,
      taxi_number: data.taxi_number,
      taxi_driver_name: data.taxi_driver_name,
      taxi_driver_phone: data.taxi_driver_phone
    }
    return this.http.post<any>(this.deviceUrl + '/staticQR', formData);
  }

  stopQR(data: any) {
    const formData = {
      qr_code: data.qrcode, // data.store.mcc,
      store_id: data.id,
    }
    return this.http.post<any>(this.deviceUrl + '/stopQR', formData);
  }

  restartQR(data: any) {
    const formData = {
      store_id: data.id,
      qr_code: data.qrcode, // data.store.mcc,
    }
    return this.http.post<any>(this.deviceUrl + '/restartQR', formData);
  }

  deleteQR(data: any) {
    const formData = {
      store_id: data.id,
      qr_code: data.qrcode, // data.store.mcc,
    }
    return this.http.post<any>(this.deviceUrl + '/deleteQR', formData);
  }

  canvas(canvas: HTMLCanvasElement) {
    console.log(canvas)
    return this.http.post<any>(this.paymentTanUrl + '/canvas', {canvas: canvas});
  }

  getAccessStoreByMerchant(user_id) {
    return this.http.post<any>(this.merchantUserUrl + '/getAccessStoreByMerchant', {user_id: user_id});
  }
  saveSubMerchantUser(merchantUser: User, accessStore: MerchantUserAccess[]) {
    return this.http.post<MerchantUserResponse>(this.userUrl + '/saveSubMerchantUserByMerchant', {merchant_user: merchantUser, merchant_user_access: accessStore});
  }

  getlistMerchantUserById(user_id) {
    return this.http.post<any>(this.merchantUserUrl + '/getlistMerchantUserById', {user_id: user_id});
  }
  getlistMerchantUserStoreById(user_id) {
    return this.http.post<any>(this.merchantUserUrl + '/getlistMerchantUserStoreById', {user_id: user_id});
  }
}
