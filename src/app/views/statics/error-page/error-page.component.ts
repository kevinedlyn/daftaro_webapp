import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
    title : string;
    content : string;
    error_id : string;

    constructor(private _route : ActivatedRoute) { }

    ngOnInit() {
        this.error_id = this._route.snapshot.paramMap.get('id');
        
        if (this.error_id == '404') {
            this.title = 'Page not Found';
            this.content = "We apologize, we cannot find what you're looking for, please make sure that you have correct link";
        } else if (this.error_id == '500') {
            this.title = 'Whoops!'
            this.content = 'There is something wrong with the server, We apologize for the inconvenience';
        }
    }

}
