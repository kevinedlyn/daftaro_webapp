import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GlobalService } from '../../services/global.service';
import { ProfileService } from '../../services/profile.service';

import { Patient } from '../../model/patient.model';

@Component({
    selector: 'app-add-profile',
    templateUrl: './add-profile.component.html',
    styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {
    isLoading: boolean = true;
    message: string;
    profileForm: FormGroup;
    profile: Patient;

    constructor(private _profileService : ProfileService, private _route : ActivatedRoute, private _globalService : GlobalService, private _router : Router, private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.buildUI();
    }

    async create() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            
            return;
        }

        const profile$ = await this._profileService.createProfile(this.profileForm.value);

        profile$.subscribe(Response => {
            this._router.navigateByUrl('/profile');
        }, error => {
            this.message = error;
        });
    }
    
    private buildUI() {
        this.profile = new Patient();
        this.profileForm = this._formBuilder.group({
            profile_picture: [''],
            full_name: ['', [ Validators.required ]],
            bpjs_number: [''],
            birthdate: ['', [ Validators.required ]],
            gender: ['', [ Validators.required ]],
            blood_type: [''],
            rhesus: [''],
            identity_type: [''],
            identity_number: [''],
            identity_proof: [''],
            red_cross_number: [''],
            home_address: [''],
            home_country: [''],
            home_province: [''],
            home_city: [''],
            home_zipcode: ['']
        });
        
        this.isLoading = false; 
    }
}

/*
        <div *ngIf="success_add_patinent" style="margin-top: 20px; margin-left: 20px;">
            <div class="alert alert-success" role="alert">
                Penambahan profil pasien Berhasil
            </div>
        </div>
*/