import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { takeWhile } from 'rxjs/operators';

import { Setting } from '../../util/settings';
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../../../assets/css/simple-form.component.css']
})
export class LoginComponent implements OnInit {
    isLoading = false;
    errorMessage: string;
    username = "";
    password = "";

    constructor(private _authService : AuthService, private _globalService : GlobalService, private _router: Router, private _route: ActivatedRoute) { }

    ngOnInit() { }

    login() { 
        if (!this.username) {
            this.errorMessage = 'Mohon mengisi Username';
            
            return;
        }
          
        if (!this.password) {
            this.errorMessage = 'Mohon mengisi Password';
            
            return;
        }
        
        this.isLoading = true;
            
        this._authService.login(this.username, this.password).pipe( takeWhile(value => this.isLoading) ).subscribe( _ => {
                this.isLoading = false;
                console.log("Success")
                this._router.navigate(['/appointment']);
            },
            error => {
                this.isLoading = false;
                this.errorMessage = error;
                console.log("Error",error)
            }
        );
    }
    
    ngOnDestroy() {
        this.isLoading = false
    }
}
