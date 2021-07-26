import { Component, OnInit, HostListener } from '@angular/core';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/observable';

import { ReceiptLocalService } from '../receipt-local.service';
import { AppointmentService } from '../../../services/appointment.service';

import { Receipt } from '../../../model/receipt.model';

@Component({
    selector: 'app-receipt-index',
    templateUrl: './receipt-index.component.html',
    styleUrls: ['./receipt-index.component.css', '../../../../assets/css/split-panel.component.css']
})
export class ReceiptIndexComponent implements OnInit {
    result: Receipt[];
    subscription: Subscription;
    offset = 0;
    isLoading: boolean;
    isUserTriggered = true;
    
    constructor(private _appointmentService : AppointmentService, private _receiptLocalService: ReceiptLocalService) { }

    ngOnInit() {
        this.restart();
    }
    
    restart () {
        this.offset = 0;
        this.result = [];
        this.refreshData();
    }
    
    async refreshData() {
        this.isUserTriggered = false;
        this.isLoading = true;
        
        try {
            let receipt$ = await this._appointmentService.getInvoice(this.offset);
            
            this.subscription = receipt$.subscribe(
                data => {
                    if (data.rows.length > 0) {
                        this.offset += data.rows.length;
                        this.result = this.result.concat(data.rows);
                    }
                    
                    this.isUserTriggered = false;
                    this.isLoading = false;
                }, err => {
                    this.isUserTriggered = false;
                    this.isLoading = false;
                }
            );
        } catch(err) {
            console.log ("error in receipt index = ", err);
        };
    }
    
    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
    
    selectReceipt(receiptId: string) {
        this._receiptLocalService.selectReceipt(receiptId);
    }
    
    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        if (!this.isUserTriggered) {
            if (!this.isLoading) 
                this.isUserTriggered = true;
            
            return;
        }
        
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight && this.isUserTriggered) {
            if (this.isLoading) {
                this.subscription.unsubscribe();
            }
            
            this.refreshData();
        }
    }
    
    @HostListener('window:scroll', ['$event'])
    windowScroll(event) {
        console.log ("receipt window scrolled");
    }
    
    /*
        loading () => {
            var box = $('<div>');
            var bar = $('<img>').addClass("bar2");
            bar.attr({
                src: "../../assets/images/logo.png",
                width: "100%"
            });
            box.append(bar);
            return box;
        }
    */
}
