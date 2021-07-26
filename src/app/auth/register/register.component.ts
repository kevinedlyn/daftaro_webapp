import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { ProfileService } from '../../services/profile.service';

import { PasswordValidator } from '../../validator/password.validator';
import { EmailValidator } from '../../validator/mail.validator';
import { RegistrationValidator } from '../../validator/registration.validator';
import { PasswordMatchValidator } from '../../validator/password.match.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registrationForm: FormGroup;
    message: string;
    provinces: any;
    cities: any;
    
    constructor(private _route : ActivatedRoute, private _profileService : ProfileService, private _globalService : GlobalService, private _router: Router, private _formBuilder: FormBuilder, private _authService: AuthService) {}

    async submit() {
        if (this.registrationForm.invalid) {
            this.registrationForm.markAllAsTouched();
            
            return;
        }
            
        const auth$ = this._authService.register(this.registrationForm.value);
        
        auth$.subscribe(token => {
            this._globalService.prepareAllData(token);
            
            this._router.navigateByUrl('/appointment');
        }, err => {
            this.message = err;
        });
    }

    ngOnInit() {
        const profileId = this._route.snapshot.paramMap.get('id');
        this.provinces = [];
        this.cities = [];
        
        this.buildUI(profileId);
        
        if (profileId)
            this.getProfile(profileId);
    }
    
       
    buildUI(profileId: string) {
        this.registrationForm = this._formBuilder.group({
            profile_id : [profileId],
            //profile_picture: [''],
            full_name: [{ value: '', disabled: profileId }, [ Validators.required ]], 
            bpjs_number: [''],
            birthdate: [{ value: '', disabled: profileId }, [ Validators.required ]], 
            gender: ['Pria'],
            blood_type: ['-'],
            rhesus: ['?'],
            identity_type: [{ value: '', disabled: profileId }], 
            identity_number: [{ value: '', disabled: profileId }], 
            //identity_proof: [''],
            //red_cross_number: [''],
            home_address: [{ value: '', disabled: profileId }], 
            home_country: [''],
            home_province: [''],
            home_city: [''],
            agreement: [false, [ Validators.requiredTrue ]],
            home_zipcode: [''],

            email_address: ['', [ Validators.required, EmailValidator ]],
            phone_number: [''],
            password: ['', [ Validators.required, PasswordValidator ]],
            repeat_password: ['', [ Validators.required, PasswordValidator ]]
        }, { validator: [ PasswordMatchValidator, RegistrationValidator ], asyncValidator: [ this._authService.credentialValidator() ]}); 
        
        this._profileService.regions.subscribe(data => {
            this.provinces = data;
        });
    }
    
    get full_name() {
        return this.registrationForm.get('full_name');
    }
    
    get birthdate() {
        return this.registrationForm.get('birthdate');
    }
    
    get email_address() {
        return this.registrationForm.get('email_address');
    }
    
    get password() {
        return this.registrationForm.get('password');
    }
    
    get repeat_password() {
        return this.registrationForm.get('repeat_password');
    }
    
    get agreement() {
        return this.registrationForm.get('agreement');
    }
    
    changeProvince(value) {
        if (value) {
            this.provinces.filter(e => {
                if (e.provinsi == value) {
                    this.cities = e.kota;
                }
                
                return false;
            });
        }
    }

    async getProfile(profileId: string) {
        const profile$ = await this._profileService.getProfile(profileId);
        
        profile$.subscribe(profile => {
            this.registrationForm.patchValue({
                full_name: profile.full_name,
                birthdate: profile.birthdate,
                identity_type: profile.identity_type,
                identity_number: profile.identity_number,
                home_address: profile.home_address
            });
            
            this.registrationForm.controls['full_name'].enable();
            this.registrationForm.controls['birthdate'].enable();
            this.registrationForm.controls['identity_type'].enable();
            this.registrationForm.controls['identity_number'].enable();
            this.registrationForm.controls['home_address'].enable();
        });
    }
}
