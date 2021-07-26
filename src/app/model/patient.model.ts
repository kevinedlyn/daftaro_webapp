export class Patient {
    profile_id: string;
    profile_picture: string;
    full_name: string;
    birthdate: Date;
    gender: string = 'Pria';

    home_address: string;
    home_city: string;
    home_zipcode: string;
    home_province: string;
    home_country: string;

    identity_type: string = 'KTP';
    identity_number: string;
    identity_proof: string;
    blood_type: string = '-';
    rhesus: string;
    bpjs_number: string;
    red_cross_number: string;

    status: string;
    created_date: Date;
    created_by: string;
    modified_date: Date;
    modified_by: string;
    modified_reason: string;
}

export class PatientResponse {
    constructor(
        public count: number,
        public rows: Patient[]
    ) { }
}

export class PatientSearch {
    full_name: string;
    birthdate: Date;
    identity_type: string;
    identity_number: string;
}