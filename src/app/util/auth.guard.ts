import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router : Router, private _authService : AuthService) { }

    canActivate(): boolean {
      try {
        if (this._authService.loggedin()) {
          return true;
        } 
      } catch (error) {
        console.log("error:", error);
        this.router.navigate(['/']);
        return false;
      }
        
    }
}
