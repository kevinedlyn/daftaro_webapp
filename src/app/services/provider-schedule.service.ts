import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Practitioners } from '../model/practitioners';
import { ProviderScheduleResponse } from '../model/provider-schedule';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderScheduleService {

  constructor(private http : HttpClient, private _authService : AuthService, private _globalService : GlobalService) { }

  async getProviderSchedule(offset:number, year : number, month : number, serviceId: number, doctorId: number, providerId : number)
  {
      console.log("Provider_id = ", providerId);
      console.log("Practitioner_id = ",doctorId);
      console.log("Service_id = ", serviceId);
      console.log("Year = ",year);
      console.log("Month = ", month);

        const destinationURL = `/v1/serviceschedules/${year}/${month}?provider_id=${providerId}&practitioner_id=${doctorId}&service_id=${serviceId}`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
        var params = {  
          fields: "schedule_id,schedule_time,consultation_fee,registration_fee,service_charge",
          offset: `${ offset }`
        };

        //no data modelling
        return this.http.get<any>(`${environment.apiURL}${ destinationURL }`, Object.assign({ params}, headers ));
  }

  
  async getProviderScheduleDetail(id : number) {
    const destinationURL = `/v1/serviceschedules/detail/${id}`;
    const headers = await this._globalService.getAuthHeader(destinationURL);

    return this.http.get<ProviderScheduleResponse>(`${ environment.apiURL }${ destinationURL }`, headers);
}

}

