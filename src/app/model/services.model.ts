export class myServices{
    constructor(
        public service_id : number,
        public service_name :string,
        public description : string,
        public status : string,
        public fav : string,
        public service_provider_id : number
    ){}
}

export class myServicesResponse {
    constructor(
        public count : number,
        public rows: myServices[]
    ){}
}
