export class Practitioners {
    constructor(
        public practitioner_id : number,
        public full_name_with_title : string,
        public gender : string,
        public foreign_language : string,
        public specialities : string,
        public sub_specialities : string,
        public short_medical_bio : string,
        public education_background : string
    ){}
}

export class PractitionersResponse {
    constructor(
        public count: number,
        public rows: Practitioners[]) { }
}

