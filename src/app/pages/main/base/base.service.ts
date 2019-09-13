import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { isNullOrUndefined } from 'util';

@Injectable()
export class BaseService {
    protected userUrl = environment.apiBaseUrl1;
    private baseUrl = environment.apiBaseUrl1;
    constructor(protected http: HttpClient, path: string) {
        this.userUrl = this.userUrl + path;
    }
    get(path: string) {
        return this.http.get<any[]>(this.baseUrl + path);
    }
    list(queryString: string, max: number, offset: number) {
        let Params = new HttpParams();
        Params = Params.append('max', max.toString());
        Params = Params.append('offset', offset.toString());
        if (isNullOrUndefined(queryString) || queryString === '') {
            return this.http.get<any>(this.userUrl + '/list', {params: Params});
        }
        Params = Params.append('query', queryString);
        return this.http.get<any>(this.userUrl + '/list', {params: Params});
    }
    show(id: number) {
        return this.http.get<any>(this.userUrl + '/' + id);
    }
    update(obj: any) {
        return this.http.put<any>(this.userUrl + '/' + obj.id, obj);
    }
    delete(obj: any) {
        return this.http.get<any>(this.userUrl + '/delete?id=' + obj.id);
    }
    create(obj: any) {
        return this.http.post<any>(this.userUrl, obj);
    }
    getByBranch(path: string, branch: number) {
        let Params = new HttpParams();
        Params = Params.append('branch', branch.toString());
        return this.http.get<any[]>(this.baseUrl + path, {params: Params});
    }
}
