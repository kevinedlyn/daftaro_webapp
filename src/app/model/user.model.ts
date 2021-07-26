import { Patient } from './patient.model';

export class User {
    public email_address: string;
    public email_status: string;
    public phone_number: string;
    public phone_status: string;
    public password: string;
    
    public created_date: Date;
    public created_by: string;
    public modified_date: Date;
    public modified_by: string;
    public modified_reason: string;
}

export class UserResponse {
    constructor(
        public patient: CompleteUser,
        public profiles: Patient[]
    ) { }
}

export class CompleteUser {
    public email_address: string;
    public email_status: string;
    public phone_number: string;
    public phone_status: string;
    public password: string;
    public balance: number;
    
    public profile_id: string;
    public profile_picture: string;
    public full_name: string;
    public birthdate: Date;
    public gender: string = 'Pria';

    public home_address: string;
    public home_city: string;
    public home_zipcode: string;
    public home_province: string;
    public home_country: string;

    public identity_type: string = 'KTP';
    public identity_number: string;
    public blood_type: string = '-';
    public rhesus: string;
    public bpjs_number: string;
    public red_cross_number: string;

    public status: string;
    public created_date: Date;
    public created_by: string;
    public modified_date: Date;
    public modified_by: string;
    public modified_reason: string;
}

export class CredentialCheck {
    public id: string;
    public email: string;
    public phone: string;
}