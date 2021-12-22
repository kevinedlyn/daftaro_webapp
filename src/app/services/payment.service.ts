import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { PaymentMethod, PaymentMethodResponse } from '../model/payment-method';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient, private _authService : AuthService, private _globalService : GlobalService) { }
r
  async getPaymentMethod(offset:number, providerId : number)
  {
        const destinationURL = `/v1/payments/provider/${providerId}`
        const headers = await this._globalService.getAuthHeader(destinationURL);
        var params = {
            fields: "title,code,payment_group,url",
            offset: `${ offset }`
        };

        return this.http.get<any>(`${environment.apiURL}${ destinationURL }`, Object.assign({ params}, headers ));
  }
}
