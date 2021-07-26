import { Component, OnInit, HostListener } from '@angular/core';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/observable';

import { AppointmentLocalService } from '../appointment-local.service';
import { AppointmentService } from '../../../services/appointment.service';

import { Appointment } from '../../../model/appointment.model';

@Component({
    selector: 'app-appointment-index',
    templateUrl: './appointment-index.component.html',
    styleUrls: ['./appointment-index.component.css', '../../../../assets/css/split-panel.component.css']
})
export class AppointmentIndexComponent implements OnInit {
    result: Appointment[];
    subscription: Subscription;
    offset = 0;
    isLoading: boolean;
    isUserTriggered = true;
        
    constructor(private _appointmentService : AppointmentService, private _appointmentLocalService: AppointmentLocalService) { }

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
            let appointment$ = await this._appointmentService.getAppointment(this.offset);
            
            this.subscription = appointment$.subscribe(
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
            console.log ("error in booking index = ", err);
        };
    }
    
    selectDetail(appointmentDetailId: string) {
        this._appointmentLocalService.selectDetail(appointmentDetailId);
    }
    
    @HostListener('window:scroll', ['$event'])
    windowScroll(event) {
        console.log ("appointment window scrolled");
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
    
    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
