import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

import { ProviderResponse } from '../model/provider.model';


@Injectable()
export class ProviderService {

  constructor(private http : HttpClient, private _authService : AuthService, private _globalService : GlobalService) { }

  async getProvider(offset:number)
  {
    const destinationURL = `/v1/healthcareproviders`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
        var params = {
            fields: "provider_id,provider_name,address,city,province,country,phone_number",
            offset: `${ offset }`
        };

        return this.http.get<ProviderResponse>(`${environment.apiURL}${ destinationURL }`, Object.assign({ params }, headers ));
  }

}
