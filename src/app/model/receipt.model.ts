import { Payment } from './payment.model';
import { Appointment } from './appointment.model';

export class Receipt {
    constructor(
        public appointment_id: string,
        
        public provider_id: string,
        public provider_name: string,
        public address: string,
        public phone_number: string,
        
        public is_multiple: boolean,
        public status: string,
        public paid_amount: number,
        public total_fee: number,
        public expired_date: Date,
        public created_by: string,
        public created_date: Date,
        public issued_at: Date,
        public teleconference: boolean) { }
}

export class ReceiptResponse {
    constructor(
        public count: number,
        public rows: Receipt[]
    ) { }
}

export class ReceiptDetailResponse {
    constructor(
        public appointment: Receipt,
        public details: Appointment,
        public payments: Payment[]) { } 
}

