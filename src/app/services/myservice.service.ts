import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

import { ProviderResponse } from '../model/provider.model';
import { myServicesResponse } from '../model/services.model';


@Injectable()
export class Healthcareservices {

  constructor(private http : HttpClient, private _authService : AuthService, private _globalService : GlobalService) { }

  async getProvider(offset:number, providerId : number)
  {
    const destinationURL = `/v1/healthcareservices?provider_id=${providerId}`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
        var params = {
            fields: "service_id,service_name,description,status,fav",
            offset: `${ offset }`
        };

        return this.http.get<myServicesResponse>(`${environment.apiURL}${ destinationURL }`, Object.assign({ params}, headers ));
  }

}