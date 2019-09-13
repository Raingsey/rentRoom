import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IuserRoleCustom} from './user-role.model';
import 'rxjs/Rx';
import * as _ from 'lodash';
import { IResponse } from '../user/user.model';

@Injectable()
export class UserRoleService {

  private roleUrl = environment.apiBaseUrl1 + '/role';
  constructor(private http: HttpClient) { }
  getRoleByUser(user: number) {
    return this.http.get<IuserRoleCustom[]>(this.roleUrl + '/getRoleByUser/' + user)
      .map(data => _.values(data));
  }
  updateRole(userId: number, roles: number[], user_id: number) {
    return this.http.post<IResponse>(this.roleUrl + '/updateRole', {userId: userId, roles: roles, user_id: user_id});
  }
}
