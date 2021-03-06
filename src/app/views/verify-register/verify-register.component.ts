import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-verify-register',
    templateUrl: './verify-register.component.html',
    styleUrls: ['./verify-register.component.css']
})
export class VerifyRegisterComponent implements OnInit {
    link: string;
    readOnly: boolean;
    
    constructor() { }

    ngOnInit() {
        this.readOnly = true;
        this.link = "/register/";
    }
}
