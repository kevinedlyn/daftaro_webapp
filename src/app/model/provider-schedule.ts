//BELUM DIGUNAKAN, karena pengambilan data dari API masih menggunakan any, no data modelling

import { Time } from "@angular/common";

export class ProviderSchedule {
    constructor(
        public schedule_id : number,
        public schedule_time:string,
        public start_time :Time,
        public end_time : Time,
        public available : string,
        public slot_duration : string,
        public teleconference : boolean,
        public consultation_fee : number,
        public registration_fee : number,
        public default_consultation_fee : number,
        public default_registration_fee : number,
        public service_charge : number,
        public replacement_name : null,
        public modified_date : Time
    ){}
}



export class ProviderScheduleResponse {
    constructor(
        public contain : any) { }
}

// interface ProviderSchedule{
//     schedule_id : number,
//     schedule_time:string,
//     start_time :Time,
//     end_time : Time,
//     available : string,
//     slot_duration : string,
//     teleconference : boolean,
//     consultation_fee : number,
//     registration_fee : number,
//     default_consultation_fee : number,
//     default_registration_fee : number,
//     service_charge : number,
//     replacement_name : null,
//     modified_date : Time
// }


