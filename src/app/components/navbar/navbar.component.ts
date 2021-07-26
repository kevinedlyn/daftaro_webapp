import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    collapsed : boolean;

    constructor(private _authService: AuthService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.collapsed = true;
    }

    logout() {
        this._authService.logout();
    }
}
