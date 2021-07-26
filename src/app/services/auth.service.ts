import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { Observable, from } from 'rxjs';
import { tap, switchAll, map } from 'rxjs/operators';

import { Setting } from '../util/settings';
import { environment } from '../../environments/environment';

import { User } from '../model/user.model';
import { Patient } from '../model/patient.model';
import { CredentialCheck } from '../model/user.model';

import { GlobalService } from './global.service';

@Injectable()
export class AuthService {
    private loginURL = `${ environment.apiURL }/v1/login`;
    private resetPasswordURL = `${environment.apiURL}/v1/password`;
    
    credentialValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => { // {[ key: string ]: any } | null
            const verificationURL = '/v1/users/verification';
            const email = control.get('email_address');
            const phone = control.get('phone_number');
            const id = control.get('patient_id');
            const query = new CredentialCheck();
            
            if (!email || !phone)
                return null;
                
            query.email = email.value;
            query.phone = phone.value;
            
            if (id)
                query.id = id.value;
            
            return from(this.checkCredentials(query)).pipe(
                switchAll(),
                map(isUnique => {
                    return (isUnique ? { 'credentialExist' : true } : null);
                })
            );
        };
    }
    
    constructor(private http:  HttpClient, private _globalService: GlobalService) { }

    login(username: string, password: string) {
        return this.http.post<string>(this.loginURL, { email_address: username, password: password, phone_number: username }).pipe( tap(refreshToken => this._globalService.prepareAllData(refreshToken)) );
    }
            
    logout() {
        this._globalService.deleteAllData('');
    }
          
    forgotPassword(username : string) {
        return this.http.get(`${this.resetPasswordURL}/${username}`);
    }
              
    async changePassword(id: number, oldPassword: string, newPassword: string) {
        var destinationURL = `/v1/users/${id}/password`;
        var headers = await this._globalService.getAuthHeader(destinationURL);
            
        return this.http.patch(`${ environment.apiURL }${ destinationURL }`, { 
                old_password : oldPassword, 
                new_password : newPassword
            }, headers
        );
    }
                   
    async updateCredentials(email_address: string, phone_number: string, password: string) {
        const credentialURL = '/v1/users/credentials';
        const headers = await this._globalService.getAuthHeader(credentialURL);

        return this.http.put(`${ environment.apiURL }${ credentialURL }`,{ email_address, phone_number, password }, headers);
    }
            
    async checkCredentials(cred: CredentialCheck) {
        const verificationURL = '/v1/users/verification';
        var headers = this._globalService.isLoggedOn() ? await this._globalService.getAuthHeader(verificationURL) : {};
            
        const query = {
            email: cred.email,
            phone: cred.phone,
            id: cred.id
        };
            
        headers['params'] = query;
            
        return this.http.get<boolean>(`${ environment.apiURL }${ verificationURL }`, headers);
    }
            
    register(data: any) {
        return this.http.post<string>(`${ environment.apiURL }/v1/users`, data);
    }
    
    requestResetPass(token : any) {
        const destinationURL = `${ this.resetPasswordURL }/${ token }`
        const refresh_token = this._globalService.getRefreshToken();
            
        return this.http.put(destinationURL, { refresh_token });
    }
            
    async resetPass(password : string) {
        const token = this._globalService.getResetToken();
        const profile = await this._globalService.getProfileData(token);

        if (profile) {
            console.log("pro = ", profile);
            
            /*
            const destinationURL = `/v1/users/${profile.patient_id}/password`; 
            const headers = await this._globalService.getAuthHeader(`${ destinationURL }`, token);
            
            return this.http.patch(`${ environment.apiURL }${ destinationURL }`, {
                key: Setting.OLD_PASSWORD_SECRET_KEY,
                password
            }, headers);
            */
        }
            
        this._globalService.removeResetToken();
    }

    loggedin() {
        console.log("global token = ",this._globalService.getRefreshToken());
        return !!this._globalService.getRefreshToken();
    }
}
