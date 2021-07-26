import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';

import { Patient, PatientSearch } from '../../model/patient.model';

import { GlobalService } from '../../services/global.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.css']
})
export class SearchProfileComponent implements OnInit {
    @Input() link: string;
    @Input() readOnly: boolean;
    
    searchQuery: PatientSearch;
    profiles: Patient[];
    subscription: Subscription;
    isLoading: boolean = false;
    
    constructor(private _profileService : ProfileService, private _globalService : GlobalService, private _router : Router, private _route: ActivatedRoute) { }

    ngOnInit(): void {
        this.searchQuery = new PatientSearch();
        
        this._route.queryParams.subscribe(value => {
            this.searchQuery.full_name = value.full_name;
            this.searchQuery.birthdate = value.birthdate;
            this.searchQuery.identity_type = value.identity_type;
            this.searchQuery.identity_number = value.identity_number;
            
            this.search();
        });
    }

    async search() {
        if (!this.searchQuery.full_name || !this.searchQuery.birthdate) {
            return;
        }
        
        this.isLoading = true;
        
        const profiles$ = await this._profileService.searchProfile(this.searchQuery);

        this.subscription = profiles$.subscribe(
            data => {
                this.profiles = data;
                
                this.changeURL();
                
                this.isLoading = false;
            }, error => {
                this.isLoading = false;
            }
        );
    }
    
    private changeURL() {
        this._router.navigate([], {
            relativeTo: this._route,
            queryParams: {
                full_name: this.searchQuery.full_name,
                birthdate: this.searchQuery.birthdate,
                identity_type: this.searchQuery.identity_type,
                identity_number: this.searchQuery.identity_number
            },
            queryParamsHandling: 'merge',
            //skipLocationChange: true
        });
    }
    
    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
