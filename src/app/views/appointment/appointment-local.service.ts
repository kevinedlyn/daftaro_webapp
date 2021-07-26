import { Injectable } from '@angular/core';

import { Subject, ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/observable';

import { Appointment } from '../../model/appointment.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentLocalService {
    appointmentSubject: ReplaySubject<Appointment[]>;
    selectedDetailSubject: Subject<string>;
    selectedDetail$: Observable<string>;
    
    constructor() {
        this.appointmentSubject = new ReplaySubject();
        this.selectedDetailSubject = new Subject();
        this.selectedDetail$ = this.selectedDetailSubject.asObservable();
    }
        
    selectDetail(appointmentDetailId: string) {
        this.selectedDetailSubject.next(appointmentDetailId);
    }
        
    appendAppointment(appointments: Appointment[]) {
        this.appointmentSubject.next(appointments);
    }
}
