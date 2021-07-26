import { Component, OnInit } from '@angular/core';

import { Setting } from '../../util/settings';

import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
    collapsed : boolean;
    invalid_name : boolean;
    invalid_email : boolean;
    invalid_inquiry : boolean;
    success : boolean;
    click : boolean;
    
    name: string;
    email: string;
    subject: string;
    inquiry: string;

    constructor(private _globalService : GlobalService) { }

    ngOnInit() {
        this.collapsed = true;
        this.click = false;
    }

    contact() {
        this.click = true;
        this.success = false;
        this.invalid_email = false;
        this.invalid_inquiry = false;
        this.invalid_name = false;

        if (this.name == '') 
            this.invalid_name = true;
            
        if (this.email == '') 
            this.invalid_email = true;
            
        if (this.inquiry == '') 
            this.invalid_inquiry = true;

        if (Setting.mailRegex.test(this.email)) 
            this.invalid_email = true;

        if (this.invalid_name || this.invalid_email || this.invalid_inquiry) 
            return;

        this._globalService.contactUs(this.name, this.subject, this.email, this.inquiry).subscribe(
            result => {
                if (result['message'] == 'success')
                    this.success = true;
                else
                    this.success = false;
            }, error => {
                this.success = false;
            }
        );
    }
}
