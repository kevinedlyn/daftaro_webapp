import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

import { AppointmentResponse } from '../model/appointment.model';
import { ReceiptResponse, ReceiptDetailResponse } from '../model/receipt.model';
import { AppointmentDetailResponse } from '../model/appointment-detail.model';

@Injectable()
export class AppointmentService {
    constructor(private http : HttpClient, private _authService : AuthService, private _globalService : GlobalService) { }

    async getAppointmentDetail(id : number) {
        const destinationURL = `/v1/appointments/detail/${id}`;
        const headers = await this._globalService.getAuthHeader(destinationURL);

        return this.http.get<AppointmentDetailResponse>(`${ environment.apiURL }${ destinationURL }`, headers);
    }
            
    async getAppointment(offset: number) {
        const destinationURL = `/v1/appointments`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
        var params = {
            fields: "appointment_detail_id,appointment_id,service_name,appointment_datetime,queue_number,status,practitioner_name,patient_name,schedule_time,provider_name",
            order: "+appointment_datetime",
            offset: `${ offset }`
        };

        return this.http.get<AppointmentResponse>(`${environment.apiURL}${ destinationURL }`, Object.assign({ params }, headers ));
    }
    
    async getReceipt(id : string) {
        const destinationURL = `/v1/appointments/${id}`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
            
        return this.http.get<ReceiptDetailResponse>(`${environment.apiURL}/v1/appointments/${id}`, headers);
    }
            
    async getInvoice(offset: number) {
        const destinationURL = `/v1/appointments/invoices`;
        const headers = await this._globalService.getAuthHeader(destinationURL);
        const params = {
            fields : "appointment_id,paid_amount,payment_date,payment_method,status,total_fee,provider_name,is_multiple,created_date",
            order : "-created_date",
            offset : `${ offset }`
        };
            
        return this.http.get<ReceiptResponse>(`${environment.apiURL}${ destinationURL }`, Object.assign({ params }, headers));
    }
}
