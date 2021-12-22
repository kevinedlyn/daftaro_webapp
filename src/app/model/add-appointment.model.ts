import { ProviderScheduleDetail } from "./provider-schedule-detail";
//for data Input ke API

export class AddAppointmentClass{
    constructor(
        public total_fee : number,
        public provider_id : number,
        public payment_method : string, //payment method name
        public appointment_details: ProviderScheduleDetail[],
        public card_token : string,
        public promo_code : string
    ){}

}
