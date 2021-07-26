import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Setting } from '../../util/settings';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { GlobalService } from '../../services/global.service';

@Component({
    selector: 'app-reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
    newPass: string;
    repeatPass: string;
    
    constructor(private _route : ActivatedRoute, private _authService : AuthService, private _globalService : GlobalService, private _router : Router) { }

    ngOnInit() {
        this.buildUI();
    }

    async buildUI() {
        var token = this._route.snapshot.paramMap.get('token');

        if (!token) 
            this._router.navigateByUrl('/login');
            
        var result = await this._authService.requestResetPass(token);
        
        console.log("result = ", result);
        console.log("1st result = ", result[0]); 
        
        this._globalService.setResetToken(result[0]);
    }

    async submit() {
        //Setting.passRegex.test(new_pass);
        
        /*
        const auth$ = await this._authService.resetPass(this.newPass);
        
        auth$.subscribe(token => {
        
            // reset confirm / login
            // this._router.navigateByUrl('/dashboard');
        });
        */
    }
}
