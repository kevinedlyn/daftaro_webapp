import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

    constructor(private _authService: AuthService, private router : Router) { }

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            /*
            if ([401, 403].indexOf(err.status) !== -1) {
                this.UserLoginService.logout();
                this.router.navigate(['/landing']);
            }
            */
            const error = err.error.message || err.error.error || err.statusText;
        
            return throwError(error);
        }));
    }
}
