export class Appointment {
    constructor(
        public appointment_id: string,
        public appointment_detail_id: string,
        public patient_name: string,
        public provider_name: string,
        
        public practitioner_name: string,
        public service_name: string,
        public appointment_datetime: Date,
        public queue_number: number,
        public status: string,
        public start_time: string,
        public schedule_time: string,
        public end_time: string,
        public consultation_fee: number,
        public registration_fee: number,
        public schedule_id: string,
        public third_party_patient_id: string) { }
}

export class AppointmentResponse {
    constructor(
        public count: number,
        public rows: Appointment[]) { }
}