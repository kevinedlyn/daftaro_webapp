import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-verify-profile',
    templateUrl: './verify-profile.component.html',
    styleUrls: ['./verify-profile.component.css']
})
export class VerifyProfileComponent implements OnInit {
    link: string;
    readOnly: boolean;

    constructor() { }

    ngOnInit() {
        this.readOnly = false;
        this.link = "/profile/";
    }
}
