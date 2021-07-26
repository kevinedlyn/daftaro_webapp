import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { AppointmentLocalService } from '../appointment-local.service';
import { AppointmentService } from '../../../services/appointment.service';

import { AppointmentDetail } from '../../../model/appointment-detail.model';

@Component({
    selector: 'app-appointment-detail',
    templateUrl: './appointment-detail.component.html',
    styleUrls: ['./appointment-detail.component.css', '../../../../assets/css/split-panel.component.css']
})
export class AppointmentDetailComponent implements OnInit {
    isLoading: boolean;
    appointment: AppointmentDetail;
    
    constructor(private _appointmentService : AppointmentService, private _appointmentLocalService: AppointmentLocalService) { }

    ngOnInit() {
        this._appointmentLocalService.selectedDetail$.subscribe(
            appointmentDetailId => {
                this.showDetail(appointmentDetailId);
            }
        );
    }
    
    async showDetail(appointmentDetailId) {
        this.isLoading = true;
        
        const appointmentDetail$ = await this._appointmentService.getAppointmentDetail(appointmentDetailId);

        appointmentDetail$.subscribe(
            data => {
                this.appointment = data.appointment;
                this.isLoading = false;
            }, error => {
                this.isLoading = false;
            }
        );
    }
}
