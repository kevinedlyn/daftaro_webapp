export class Promocode {
    constructor(
        public code : string,
        public title : string,
        public start_date : Date,
        public end_date : Date,
        public amount : number,
        public percentage : number,
        public quantity : number,
        public email_verified : boolean,
        public phone_verified : boolean,
        public identity_verified : boolean,
        public max_registration_duration : number,
        public max_reschedule_duration : number,
        public description : string,
        public picture_url : string,
        public status : string,
        public modified_by : string,
        public modified_reason : string,
        public created_by : string,
        public created_date : Date,
        public modified_date : Date,
        public provider_id : number,
        public service_id : number,
        public practitioner_id : number,
        public practioner_name : string,
        public service_name : string,
        public provider_name : string,
        public booking_type : string
       ) { }
}

export class PromocodeResponse{
    constructor(
        public count: number,
        public rows: Promocode[]) { }
}
