import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IChangePassword} from './change-password.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_guards/authentication.service';
import {Constant} from '../main/constant';
import * as forge from 'node-forge';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    pageTitle = 'Change Password';
    f: FormGroup;
    userid = 0;
    model: any = {};
    loading: boolean;
    hide: boolean;
    error = '';

    constructor(private router: Router, private authenticationService: AuthenticationService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.loading = false;
        this.hide = true;
        this.initForm();
    }

    goLogin() {
        this.router.navigate(['/auth/login']);
    }

    initForm(): void {
        this.f = this.fb.group({
            'id': this.userid,
            'username': ['', Validators.required],
            'temporaryPass': ['', Validators.required],
            'newPass': ['', Validators.required],
            'confirmNewPass': ['', Validators.required]
        }, {
            validator: CustomValidator.Match('newPass', 'confirmNewPass')
        });
    }

    changePass(obj: IChangePassword) {
        console.log('hey xxxxxxxxxxx' + obj.temporaryPass);
        if (obj.temporaryPass.indexOf(Constant.FIRST_PASS) === -1) {
            // not contain first pass
            obj.temporaryPass = this.EncryptPassword(obj.temporaryPass);
        }
        console.log(obj.temporaryPass);
        obj.newPass = this.EncryptPassword(obj.newPass);
        console.log('obj change password', obj)
        // this.router.navigate(['/auth/login']);
        this.authenticationService.changePassword(obj.username, obj.temporaryPass, obj.newPass)
            .subscribe(result => {
                console.log(result);
                if (result === true) {
                    console.log(result);
                    // login successful
                    // let token = response.json() && response.json().token;
                    // localStorage.setItem('currentUser', JSON.stringify({ username: this.model.username, token: token }));
                    this.router.navigate(['/auth/login']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect.';
                    this.loading = false;
                }
            });
    }

    openSnackBar(message: string, action: string) {
        // this.snackBar.open(message, action, {
        //   duration: 3000,
        // });
    }
    EncryptPassword(password: string) {
        const token = Constant.ENCRYPE_PASS.token;
        const passWord = password + token;
        const secrete = Constant.ENCRYPE_PASS.secrete;
        const salt = Constant.ENCRYPE_PASS.salt;
        const key = forge.pkcs5.pbkdf2(secrete, salt, 40, 16);
        const iv = Constant.ENCRYPE_PASS.iv;

        const cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(passWord));
        cipher.finish();
        const cipherText = forge.util.encode64(cipher.output.getBytes());
        return cipherText;
    }
}

export class CustomValidator {
    /**
     * Match two controls if they are the same
     * @param firstControlName
     * @param secondControlName
     * @returns {(AC: AbstractControl) => any}
     * @constructor
     */
    static Match(firstControlName, secondControlName) {
        return (AC: AbstractControl) => {
            const firstControlValue = AC.get(firstControlName).value;
            const secondControlValue = AC.get(secondControlName).value;
            if (firstControlValue !== secondControlValue) {
                AC.get(secondControlName).setErrors({MatchFields: true});
            } else {
                return null
            }
        };
    }
}
