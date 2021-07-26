import { Patient } from './patient.model';

export class AppointmentDetail {
    constructor(
        public appointment_id: string,
        public appointment_detail_id: string, 
        public patient_name: string, 
        public patient_id: string, 
        public practitioner_name: string,
        public provider_name: string,
        public service_name: string,
        public appointment_datetime: Date,
        public start_time: string,
        public end_time: string,
        public registration_fee: number,
        public consultation_fee: number,
        public created_by: string,
        public provider_id: string, 
        public queue_number: string,
        public status: string,
        public modified_reason: string,
    ) { }
}

export class AppointmentDetailResponse {
    constructor(
        public appointment: AppointmentDetail,
        public patient: Patient,
        public feedback: string[]
    ) {}
}