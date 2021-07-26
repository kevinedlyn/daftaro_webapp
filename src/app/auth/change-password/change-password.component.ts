import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Setting } from '../../util/settings';

import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css', '../../../assets/css/simple-form.component.css']
})
export class ChangePasswordComponent implements OnInit {
    subscription: Subscription;
    oldPassword: string;
    newPassword: string;
    retypePassword: string;
    message: string;
    retypeMessage: string;
    isLoading: boolean;
    isError: boolean = true;
    isValidOld: boolean = true;
    isValidNew: boolean = true;
    
    constructor(private _authService: AuthService, private _profileService : ProfileService, private _globalService: GlobalService) { }

    ngOnInit() { }

    async changePassword() {
        var hasError = false;
        
        if (!this.oldPassword){
            this.isValidOld = false;
            
            hasError = true;
        } else {
            this.isValidOld = true;
        }
    
        if (!this.newPassword){
            this.isValidNew = false;
            
            hasError = true;
        } else {
            this.isValidNew = true;
        }
        
        if (!this.retypePassword) {
            this.retypeMessage = "Mohon mengisi Ulangi Kata Kunci";
            hasError = true;
        }
        
        if (this.newPassword != this.retypePassword) {
            this.retypeMessage = "Password baru dan Ulangi password tidak sama";
            
            hasError = true;
        }
        
        if (hasError) {
            return;
        }
        
        this.retypeMessage = "";
        this.isLoading = true;
        
        const profile = this._globalService.getUserData();
        const user$ = await this._authService.changePassword(profile['patient_id'], this.oldPassword, this.newPassword);
        
        this.subscription = user$.subscribe(data => {
            this.message = 'Berhasil merubah Password';
            this.isError = false;
            this.oldPassword = '';
            this.newPassword = '';
            this.retypePassword = '';
            
            this.isLoading = false;
        }, error => {
            this.message = error;
            this.isError = true;
            
            this.isLoading = false;
        });
    }
    
    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
