import { Component, OnInit } from '@angular/core';

import { Setting } from '../../util/settings';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css', '../../../assets/css/simple-form.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    errorMessage: string;
    successMessage: string;
    email = '';

    constructor(private _authService: AuthService) { }

    ngOnInit() {
        
    }

    send() {
        const result = Setting.mailRegex.test(this.email);
        
        if (!result) {
            this.errorMessage = 'Mohon mengisi Email yang valid';
            this.successMessage = '';
            
            return;
        }
        
        this._authService.forgotPassword(this.email).subscribe (_ => {
            this.successMessage = 'Email berhasil dikirim. Silahkan mengecek email anda';  
            this.errorMessage = '';
            
            this.email = '';
        }, error => {
            this.errorMessage = error;
            this.successMessage = '';
        });
    }
}
