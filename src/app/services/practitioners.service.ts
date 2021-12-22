import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

import { PractitionersResponse } from '../model/practitioners';


@Injectable()
export class PractitionersService {

  constructor(private http : HttpClient, private _authService : AuthService, private _globalService : GlobalService) { }

  async getPractitioner(offset:number, providerId : number, serviceId : number)
  {
    const destinationURL = `/v1/medicalpractitioners?provider_id=${providerId}&service_id=${serviceId}`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
        var params = {
            fields: "practitioner_id,full_name_with_title,gender,foreign_language,specialities,sub_specialities,short_medical_bio,educaional_background",
            offset: `${ offset }`
        };

        return this.http.get<PractitionersResponse>(`${environment.apiURL}${ destinationURL }`, Object.assign({ params}, headers ));
  }

}