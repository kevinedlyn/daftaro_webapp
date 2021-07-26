import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

import { Patient } from '../../model/patient.model';

import { GlobalService } from '../../services/global.service';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-detail-profile',
    templateUrl: './detail-profile.component.html',
    styleUrls: ['./detail-profile.component.css']
})
export class DetailProfileComponent implements OnInit {
    @Input() profileForm: FormGroup;
    @Input() profile: Patient;
    
    provinces: any;
    cities: any;
    
    constructor(private _globalService: GlobalService, private _profileService: ProfileService) { }

    ngOnInit() { 
        this.provinces = [];
        this.cities = [];
        
        this.buildUI();
    }
    
    buildUI() {
        this._profileService.regions.subscribe(data => {
            this.provinces = data;
            
            this.changeProvince(this.profile.home_province);
        });
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

    async uploadPhoto(event : any) {
        const imagesArr = await this._globalService.readURL(event);

        if (imagesArr) {
            forkJoin(imagesArr).subscribe(async images => {
                const pic= images[0];
                var profile$ = await this._profileService.uploadPhoto(pic);
                
                profile$.subscribe(profileURL => {
                    this.profile.profile_picture = profileURL;
                    this.profileForm.patchValue({
                        profile_picture: profileURL
                    }); 
                }, err => {
                    // show err
                });
            });
        }
    }
    
    async uploadIdentityProof(event : any) {
        const imagesArr = await this._globalService.readURL(event);

        if (imagesArr) {
            forkJoin(imagesArr).subscribe(async images => {
                const proof = images[0];
                var identity$ = await this._profileService.uploadIdentity(proof);
                
                identity$.subscribe(identityURL => {
                    this.profile.identity_proof = identityURL;
                    
                    this.profileForm.patchValue({
                        identity_proof: identityURL
                    });
                }, err => {
                    // show err
                });
            });
        }
    }
}
