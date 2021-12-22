import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Practitioners } from '../model/practitioners';
import { PromocodeResponse } from '../model/promocode';
import { ProviderScheduleResponse } from '../model/provider-schedule';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  constructor(private http : HttpClient, private _authService : AuthService, private _globalService : GlobalService) { }

  async getPromocode(offset:number, end_date:string, status :string)
  {
      console.log("End_date = ", end_date);
      console.log("status = ",status);

        const destinationURL = `/v1/promos?end_date=${end_date}&status=${status}`;
        const tempdestinationURL = `/v1/promos`
        const headers = await this._globalService.getAuthHeader(tempdestinationURL);
        var params = {  
          fields: "code,title,start_date,end_date,amount,percentage,quantity,email_verified,phone_verified,identity_verified,max_registration_duration,max_reschedule_duration,description,picture_url,status,modified_by,modified_reason,created_by,created_date,modified_date,provider_id,service_id,practitioner_id,practitioner_name,service_name,provider_name,booking_type",
          // offset: `${ offset }`
        };
        return this.http.get<PromocodeResponse>(`${environment.apiURL}${ destinationURL }`, Object.assign({ params}, headers ));
  }
  
}
