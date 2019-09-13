import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../_guards/authentication.service';
import {Ilogin} from './login.model';
import {IUser} from '../../user/user.model';
import {Constant} from '../../main/constant';
import * as forge from 'node-forge';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    f: FormGroup;
    model: any = {};
    loading: boolean;
    hide: boolean;
    error = '';
    obj: Ilogin;
    objUser: IUser;

    constructor(private router: Router, private authenticationService: AuthenticationService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.loading = false;
        this.hide = true;
        // reset login status
        this.authenticationService.logout();
        this.initForm();
    }

    initForm(): void {
        this.f = this.fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        });
    }

    login(form: Ilogin) {
        this.loading = true;
        this.error = '';
        console.log('log in', form.password, form.username);

        this.authenticationService.login(form.username, form.password)
        .subscribe(result => {
            console.log(result)
          if (result === true) {
            this.router.navigate(['/app/dashboard']);
          } else {
            // login failed
            this.error = 'Username or password is incorrect.';
            this.loading = false;
          }
        });
    }


}
