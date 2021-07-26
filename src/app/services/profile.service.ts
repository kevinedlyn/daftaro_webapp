import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Patient, PatientSearch, PatientResponse } from '../model/patient.model';
import { UserResponse } from '../model/user.model';

import { GlobalService } from './global.service';
import { AuthService } from './auth.service';

@Injectable()
export class ProfileService {
    private profileURL = '/v1/profiles';
    
    get regions() {
        return this.http.get('assets/json/regions.json');
    }

    constructor(private http: HttpClient, private datepipe: DatePipe, private _globalService: GlobalService) { }
    
    async createProfile(data : Patient) {
        var headers = await this._globalService.getAuthHeader(this.profileURL);

        return this.http.post(`${ environment.apiURL }${ this.profileURL }`, data, headers);
    }
 
    async getUserProfiles(id: string) {
        const destinationURL = `/v1/users/${ id }`;
        const headers = await this._globalService.getAuthHeader(destinationURL);

        return this.http.get<UserResponse>(`${ environment.apiURL }${ destinationURL }`, headers);
    }
            
    async searchProfile(searchQuery: PatientSearch) {
        var headers = this._globalService.isLoggedOn() ? await this._globalService.getAuthHeader(this.profileURL) : {};
        const query = {
            full_name: searchQuery.full_name, 
            birthdate: this.datepipe.transform(searchQuery.birthdate, 'yyyy-MM-dd')
        };
            
        headers['params'] = query; 
            
        if (searchQuery.identity_type)
            query['identity_type'] = searchQuery.identity_type;
            
        if (searchQuery.identity_number)
            query['identity_number'] = searchQuery.identity_number;
            
        return this.http.get<Patient[]>(`${ environment.apiURL }${ this.profileURL }`, headers);
    }
            
    async updateProfile(data: Patient) {
        const destinationURL = `/v1/profiles/${ data.profile_id }`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
        
        return this.http.put(`${ environment.apiURL }${ destinationURL }`, {
            full_name: data.full_name,
            birthdate: data.birthdate,
            status: data.status,
            gender: data.gender,
            profile_picture: data.profile_picture,
            bpjs_number: data.bpjs_number,
            home_address: data.home_address,
            home_city: data.home_city,
            home_zipcode: data.home_zipcode,
            home_province: data.home_province,
            home_country: data.home_country,
            identity_type: data.identity_type,
            identity_number: data.identity_number,
            identity_proof : data.identity_proof,
            blood_type: data.blood_type,
            rhesus: data.rhesus,
            red_cross_number: data.red_cross_number,
            modified_reason: 'Updated from Web'
        }, headers);
    }

    async getProfile(id : string) {
        const destinationURL = `/v1/profiles/${ id }`;
        const header = this._globalService.isLoggedOn() ? await this._globalService.getAuthHeader(destinationURL) : {};

        return this.http.get<Patient>(`${ environment.apiURL }${ destinationURL }`, header);
    }

    async removeProfile(id : string) {
        const destinationURL = `/v1/profiles/${ id }`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
            
        return this.http.delete(`${ environment.apiURL }${ destinationURL }`, headers);
    }
            
    async uploadPhoto(image: File) {
        const destinationURL = '/v1/storages/profile';
        var headers = await this._globalService.getAuthHeader(destinationURL);
        const formData = new FormData();
            
        formData.append("profile_picture", image);
        headers['responseType'] = 'text';
            
        return this.http.post<string>(`${environment.apiURL}${ destinationURL }`, formData, headers);
    }
            
    async uploadIdentity(image: File) {
        const destinationURL = '/v1/storages/identity';
        var headers = await this._globalService.getAuthHeader(destinationURL);
        const formData = new FormData();
        
        formData.append("identity_proof", image);
        headers['responseType'] = 'text';
            
        return this.http.post<string>(`${ environment.apiURL }${ destinationURL }`, formData, headers);
    }

    async linkProfile(profileId: string, birthdate: Date) { //(current_id : number, profile_data : Patient) {
        const headers = await this._globalService.getAuthHeader(this.profileURL);
            
        return this.http.post(`${environment.apiURL}${ this.profileURL }`, {
            profile_id: profileId,
            birthdate: this.datepipe.transform(birthdate, 'yyyy-MM-dd'),
            //identity_type: data.identity_type,
            //identity_number: data.identity_number
        }, headers);
    }
}
