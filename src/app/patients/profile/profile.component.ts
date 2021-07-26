import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Setting } from '../../util/settings';

import { Patient } from '../../model/patient.model';
import { User } from '../../model/user.model';

import { GlobalService } from '../../services/global.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: User;
    userData: User;
    profiles : Patient[];
    userSubscription: Subscription;
    profilesSubscription: Subscription;
    message : string;
    isLoading: boolean;
    isValidPhone: boolean;
    isValidPassword: boolean = true;
    isError: boolean = true;
 
    constructor(private _profileService: ProfileService, private _authService: AuthService, private _router: Router, private _globalService: GlobalService) { }

    ngOnInit() {
        this.user = new User();
        this.userData = new User();
        this.profiles = [];

        this.getAllProfiles();
    }

    clickProfile(id : number) {
        this._router.navigate(['/detail/' + id]);
    }

    async onSubmit(email, phone, password) {
        
        this.message = "";
        
        if (!email && !phone) {
            this.isError = false;
            this.message = "Mohon mengisi Email atau Telepon";
            
            return;
        }
        
        if (!password) {
            this.isValidPassword = false;
            
            return;
        } else {
            this.isValidPassword = true;
        }
        
        if (email && !Setting.mailRegex.test(email)) {
            return;
        }
        
        this.isLoading = true;
        
        const user$ = await this._authService.updateCredentials(email, phone, password);
        
        this.userSubscription = user$.subscribe(data => {
            this.isError = false;
            this.message = "Penggantian Kredensial berhasil";
            
            if (email)
                this.user.email_address = email;
            if (phone)
                this.user.phone_number = phone;
            
            this.userData.email_address = "";
            this.userData.phone_number = "";
            this.userData.password = "";
            this.isValidPassword = true;
            this.isLoading = false;
        }, error => {
            this.isError = true;
            this.message = error;
            this.isLoading = false;
        });
    }

    async getAllProfiles() {
        this.isLoading = true;
        const user = await this._globalService.getUserData();
        const patient$ = await this._profileService.getUserProfiles(user.patient_id);
        
        this.profilesSubscription = patient$.subscribe(
            data => {
                this.user = data.patient;
                this.profiles = data.profiles;
                this.isLoading = false;
            }, error => {
                this.isLoading = false;
            }
        );
    }
    
    ngOnDestroy() {
        if (this.userSubscription)
            this.userSubscription.unsubscribe();
        if (this.profilesSubscription)
            this.profilesSubscription.unsubscribe();
    }
}
