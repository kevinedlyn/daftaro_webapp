import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { catchError, combineAll } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';

import { Setting } from '../util/settings';
import { environment } from '../../environments/environment';
import { PatientSearch } from '../model/patient.model';

@Injectable()
export class GlobalService {
    private refreshTokenURL = `${environment.apiURL}/v1/token/refresh`;
    private logoutURL = `${environment.apiURL}/v1/logout`;
    private profileDataURL = '/v1/token/info';
    private contactURL = '/v1/healthcareproviders/shoutbox';
    
    // do not remove these
    private expire: number | Date = Setting.cookieExpire; 
    private sameSite: 'Strict'| 'Lax' | 'None' = environment.secure ? 'Strict' : 'Lax';
    private cookieOpts = {  // domain: environment.webName //error
        expires: this.expire,
        path: '/',
        secure: environment.secure,
        sameSite: this.sameSite
    };

    constructor(private http: HttpClient, private _router: Router, private _cookieService: CookieService, private _imageCompress: NgxImageCompressService) { }

    async prepareAllData(refreshToken: string) {
        //this._cookieService.set(Setting.REFERSH_TOKEN_KEY, refreshToken);
        localStorage.setItem('REFERSH_TOKEN_KEY', JSON.stringify(refreshToken));

        console.log("refreshToken = ", refreshToken);
        console.log("token = ", JSON.parse(localStorage.getItem('REFERSH_TOKEN_KEY')));
        //console.log("Setting.Refresh Token = ", Setting.REFERSH_TOKEN_KEY);
        //console.log("Saved token = ", this.getRefreshToken());

        const data = await this.getProfileData();
        console.log("Data = ", JSON.parse(localStorage.getItem('PROFILE_KEY')));
        
        if (data) {
            //this._cookieService.set(Setting.PROFILE_KEY, JSON.stringify(data));
            localStorage.setItem('PROFILE_KEY', JSON.stringify(data));
        }
    }
    
    async getProfileData(token: string = JSON.parse(localStorage.getItem('REFERSH_TOKEN_KEY'))) {
        // console.log ("saved = ", this.getRefreshToken());
        // console.log ("token = ", token);

        console.log("token = ", token);
        
        var headers = await this.getAuthHeader(this.profileDataURL, token);

        return this.http.get(`${ environment.apiURL }${ this.profileDataURL }`, headers).toPromise();
    }
    
    deleteAllData(destinationURL: string) {
        this.http.post(this.logoutURL, { refresh_token : this._cookieService.get(Setting.REFERSH_TOKEN_KEY) });
        this._cookieService.deleteAll();
        this._router.navigate([destinationURL]);
    }
    
    getRefreshToken() {
        //return this._cookieService.get(Setting.REFERSH_TOKEN_KEY);
        console.log("global token return = ", localStorage.getItem('REFERSH_TOKEN_KEY'));
        return localStorage.getItem('REFERSH_TOKEN_KEY');
    }
    
    setResetToken(token: string) {
        this._cookieService.set(Setting.RESET_PASSWORD_KEY, token);
    }
    
    removeResetToken() {
        this._cookieService.delete(Setting.RESET_PASSWORD_KEY);
    }
    
    getResetToken() {
        return this._cookieService.get(Setting.RESET_PASSWORD_KEY);
    }
    
    async getAuthHeader(destinationURL : string, token: string =  JSON.parse(localStorage.getItem('REFERSH_TOKEN_KEY'))) {
        var header = await this.http.post(this.refreshTokenURL, { refresh_token : token, destination_URL : destinationURL }).toPromise();

        return {
            headers: {
                Authorization : `Bearer ${ header[Setting.ACCESS_TOKEN_KEY] }`
                //Authorization : `Bearer ${ header[JSON.parse(localStorage.getItem('ACCESS_TOKEN_KEY'))] }`
            }
        }
    }
    
    getUserData() {
        //return JSON.parse(this._cookieService.get(Setting.PROFILE_KEY));
        return JSON.parse(localStorage.getItem('PROFILE_KEY'));
    };
    
    contactUs (sender: string, subject: string, mail: string, question: string) {
        return this.http.post(`${environment.apiURL}${ this.contactURL }`,{
            sender : sender,
            subject : subject,
            mail : mail,
            question : question
        });
    }
    
    isLoggedOn() {
        return !!this.getRefreshToken();
    }
    
    readURL(event : any): Observable<File>[] {
        if (event && event.target) {
            const files = event.target.files;

            return Object.keys(files).map(key => {
                return new Observable(observer => {
                    const file = files[key];
                    const reader = new FileReader();

                    reader.onload = async(evt: any) => {
                        const localURL = evt.target.result;

                        const newImage = await this.compressImage(localURL, file);

                        observer.next(newImage);
                        observer.complete();
                    };

                    reader.onerror = err => observer.error(err);

                    reader.readAsDataURL(file);
                });
            });
        }
        
        return [];
    }
    
    async compressImage(image, file) {
        if (file.size >= Setting.ImageUploadSize) {
            const orientation = -1;
            const result = await this._imageCompress.compressFile(image, orientation, 10, 30);
            const imageBlob = this.convertBlob(result.split(',')[1], file['type']);
            const imageFile = new File([imageBlob], file['name'], { type: file['type'] });

            return imageFile;
        } else {
            return file;
        }
    }
    
    convertBlob(data, type) {
        const bytestring = window.atob(data);
        const arrayBuffer = new ArrayBuffer(bytestring.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < bytestring.length; i++)
            intArray[i] = bytestring.charCodeAt(i);
            
        const blob = new Blob([intArray], { type });
        
        return blob;
    }
    
    
    
    /*
    errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
    */
}
