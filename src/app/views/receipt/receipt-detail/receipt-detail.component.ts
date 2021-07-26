import { Component, OnInit } from '@angular/core';

import { ReceiptLocalService } from '../receipt-local.service';
import { AppointmentService } from '../../../services/appointment.service';

import { Receipt } from '../../../model/receipt.model';
import { Appointment } from '../../../model/appointment.model';
import { Payment } from '../../../model/payment.model';

@Component({
    selector: 'app-receipt-detail',
    templateUrl: './receipt-detail.component.html',
    styleUrls: ['./receipt-detail.component.css', '../../../../assets/css/split-panel.component.css']
})
export class ReceiptDetailComponent implements OnInit {
    isLoading: boolean;
    appointment: Receipt;
    details: Appointment;
    payments: Payment[];
    
    constructor(private _appointmentService : AppointmentService, private _receiptLocalService: ReceiptLocalService) { }

    ngOnInit() { 
        this._receiptLocalService.selectedReceipt$.subscribe(
            receiptId => {
                this.showDetail(receiptId);
            }
        );
    }
    
    async showDetail(receiptId) {
        this.isLoading = true;
        
        const receiptDetail$ = await this._appointmentService.getReceipt(receiptId);
        
        receiptDetail$.subscribe(
            data => {
                this.appointment = data.appointment;
                this.details = data.details;
                this.payments = data.payments;
                
                this.isLoading = false;
            }, error => {
                this.isLoading = false;
            }
        );
    }
}
