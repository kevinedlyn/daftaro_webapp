export class Payment {
    constructor(
        public appointment_id: string, 
        public status: string, 
        public paid_amount: number, 
        public payment_method: string, 
        public payment_date: Date) { }
}
