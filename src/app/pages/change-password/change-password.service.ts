import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';
import * as _ from 'lodash';
import { IChangePassword } from './change-password.model';
import { IResponse } from '../user/user.model';

@Injectable()
export class ChangePasswordService {
  private userUrl = environment.apiBaseUrl1 + '/user/changePassword';
  constructor(private http: HttpClient) { }
  // changePassword(changePass: IChangePassword) {
  //   const d = new FormData();
  //   d.append('id', changePass.id.toString());
  //   d.append('currentPass', changePass.currentPass);
  //   d.append('newPass', changePass.newPass);
  //   return this.http.post<IResponse>(this.userUrl, d);
  // }
}
