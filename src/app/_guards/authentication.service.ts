import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Global} from '../helper/global';
import 'rxjs/add/operator/map'
// import {IUsers} from '../pages/users/users.model';
import {Observable} from 'rxjs';
import {IUsers} from '../pages/model/users.model';

@Injectable()
export class AuthenticationService {
    public token: string;
    private localUserKey = 'MLACurrentUser';

    constructor(private http: Http, private gb: Global) {
        // set token if saved in local storage
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    // public getToken(): string {
    //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //   return currentUser.token;
    // }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(environment.apiBaseUrl1 + '/users/login', JSON.stringify({username: username, password: password}))
            .map((response: Response) => {
                    console.log(response.json());
                    if (response.json().code === 200) {
                        // const token = response.json();
                        // this.token = token;
                        this.gb.g_user = response.json().id;
                        localStorage.setItem('currentUser', JSON.stringify(response.json().user));
                        return true;
                    } else {
                        return false;
                    }
                }
            );
    }

    changePassword(username: string, temporaryPass: string, newPass: string): Observable<boolean> {
        return this.http.post(environment.apiBaseUrl1 + '/users/reset' , JSON.stringify({username: username, temporaryPass: temporaryPass, newPass: newPass}))
            .map((response: Response) => {
                    console.log(response.json());
                    if (response.json().code === 200) {
                        // const token = response.json();
                        // this.token = token;
                        this.gb.g_user = response.json().id;
                        localStorage.setItem('currentUser', JSON.stringify(response.json().user));
                        return true;
                    } else {
                        return false;
                    }
                }
            );
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    getLoginUserName(): string {
        return this.getLoginUser().name;
    }

    getLoginUser(): IUsers {
        return JSON.parse(sessionStorage.getItem(this.localUserKey)) as IUsers;
    }

    setLoginUser(user: IUsers) {
        sessionStorage.setItem(this.localUserKey, JSON.stringify(user));
    }
}
