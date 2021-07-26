import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { forkJoin } from 'rxjs';
import { combineAll, switchMap } from 'rxjs/operators';

import { UserResponse } from '../../model/user.model';
import { Patient } from '../../model/patient.model';

import { GlobalService } from '../../services/global.service';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
    isLoading: boolean = true;
    isMainProfile: boolean = false;
    hasAccess: boolean = false;
    isLinked: boolean = false;
    profileForm: FormGroup;
    profile: Patient;
    message: string;

    constructor(private _globalService: GlobalService, private _formBuilder: FormBuilder, private _profileService: ProfileService, private _route: ActivatedRoute, private _router: Router) { } 
        
    ngOnInit() { 
        this.buildUI();
    }
    
    async buildUI() {
        const profileId = this._route.snapshot.paramMap.get('id');
        const user = await this._globalService.getUserData();

        forkJoin([
            this._profileService.getUserProfiles(user.patient_id),
            this._profileService.getProfile(profileId)
        ]).pipe(
            switchMap(x => x),
            combineAll()
        ).subscribe(([ completeUser, profile ]) => {
            const fullUser = completeUser as UserResponse;
            this.profile = profile as Patient;

            if (fullUser.patient.profile_id == profileId)
                this.isMainProfile = true;

            if (this.profile.created_by == user.patient_id || fullUser.patient.profile_id == profileId) {
                this.hasAccess = true;
            }
            
            for (var userProfile of fullUser.profiles) {
                if (profileId == userProfile.profile_id) {
                    this.isLinked = true;
                    break;
                }
            }
            
            const inputDisabled = !(this.hasAccess && this.isLinked);
            
            this.profileForm = this._formBuilder.group({
                profile_picture: [{ value: this.profile.profile_picture, disabled: inputDisabled }],
                full_name: [{ value: this.profile.full_name, disabled: inputDisabled }, [ Validators.required ]],
                bpjs_number: [{ value: this.profile.bpjs_number, disabled: inputDisabled }],
                birthdate: [{ value: this.profile.birthdate, disabled: inputDisabled }, [ Validators.required ]],
                gender: [{ value: this.profile.gender, disabled: inputDisabled }],
                blood_type: [{ value: this.profile.blood_type, disabled: inputDisabled }],
                rhesus: [{ value: this.profile.rhesus, disabled: inputDisabled }],
                identity_type: [{ value: this.profile.identity_type, disabled: inputDisabled }],
                identity_number: [{ value: this.profile.identity_number, disabled: inputDisabled }],
                identity_proof: [{ value: this.profile.identity_proof, disabled: inputDisabled }],
                red_cross_number: [{ value: this.profile.red_cross_number, disabled: inputDisabled }],
                home_address: [{ value: this.profile.home_address, disabled: inputDisabled }],
                home_country: [{ value: this.profile.home_country, disabled: inputDisabled }],
                home_province: [{ value: this.profile.home_province, disabled: inputDisabled }],
                home_city: [{ value: this.profile.home_city, disabled: inputDisabled }],
                home_zipcode: [{ value: this.profile.home_zipcode, disabled: inputDisabled }]
            });
            
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
        });
    }
    
    async save() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            
            return;
        }
        
        const result$ = await this._profileService.updateProfile(Object.assign(this.profile, this.profileForm.value));
        
        result$.subscribe({
            complete: () => this._router.navigate(['/profile'])
        });
    }
    
    async link() {
        const profileId = this._route.snapshot.paramMap.get('id');
        const link$ = await this._profileService.linkProfile(profileId, this.profile.birthdate); //(this.current_id, this.profile);

        link$.subscribe(response => {
            if (this.isLinked)
                this._router.navigateByUrl('/profile');
            else 
                this._router.navigateByUrl('/verify-profile');
        }, err => {
            this.message = err;
        });
    }
    
    async unlink() {
        const profileId = this._route.snapshot.paramMap.get('id');
        const this$ = await this._profileService.removeProfile(profileId);
        
        this$.subscribe({
            complete: () => {
                if (this.isLinked)
                    this._router.navigateByUrl('/profile');
                else 
                    this._router.navigateByUrl('/verify-profile');
            }
        });
    }
}

    /*
    <div *ngIf=isDeleted" style="margin-top: 20px; margin-left: 20px;">
            <div class="alert alert-success text-center" role="alert" >
                Penghapusan data berhasil
            </div>
        </div>

        <div *ngIf="updated" style="margin-top: 20px; margin-left: 20px;">
            <div class="alert alert-success" role="alert">
                Penggantian profile pasien berhasil
            </div>
        </div>

        <div *ngIf="success_link_patient" style="margin-top: 20px; margin-left: 20px;">
            <div class="alert alert-success" role="alert">
                Link Pasien Berhasil
            </div>
        </div>
    */