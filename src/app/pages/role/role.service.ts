import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRole, IRoleObj } from './role.model';
import 'rxjs/Rx';
import * as _ from 'lodash';
import {Imenu} from './role-menu.model';
import { isNullOrUndefined } from 'util';

@Injectable()
export class RoleService {

  private url = environment.apiBaseUrl1 + '/role';
  private roleMenuUrl = environment.apiBaseUrl1 + '/roleMenu';
  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<IRole[]>(this.url)
      .map(data => _.values(data));
  }
  list(queryString: string, max: number, offset: number) {
    let Params = new HttpParams();
    Params = Params.append('max', max.toString());
    Params = Params.append('offset', offset.toString());
    if (isNullOrUndefined(queryString) || queryString === '') {
      return this.http.get<IRoleObj>(this.url + '/list', {params: Params})
    }
    Params = Params.append('query', queryString);
    return this.http.get<IRoleObj>(this.url + '/list', {params: Params})
  }
  getMainMenu(roleId: number) {
    return this.http.get<Imenu[]>(this.roleMenuUrl + '/findMain/' + roleId)
      .map(data => _.values(data));
  }
  getSubMenu(roleId: number, parent_id: number) {
    return this.http.get<Imenu[]>(this.roleMenuUrl + '/findSub/' + roleId + '/' + parent_id)
      .map(data => _.values(data));
  }
  update(id: number, obj: IRole) {
    return this.http.put(this.url + '/' + id, obj);
  }
  updatePermission(roleId: number, permissions: number[], user_id: number) {
    return this.http.post(this.roleMenuUrl + '/updatePermission', {roleId: roleId, permissions: permissions, user_id: user_id});
  }
  create(obj: IRole) {
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', undefined);
    // headers.append('Accept', 'application/json');
    // return this.http.post(this.url, obj, {headers: headers});
    return this.http.post(this.url, obj);
  }

}
