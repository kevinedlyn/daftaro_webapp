import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from '../util/auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AppointmentComponent } from '../views/appointment/appointment.component';

const routes: Routes = [
    {
        path : 'login', 
        component: LoginComponent,
        pathMatch: 'full'
    },{
        path : 'forgot-password', 
        component: ForgotPasswordComponent, 
        pathMatch: 'full'
    }, {
        path : 'register',
        component: RegisterComponent, 
        pathMatch: 'full'
    }, {
        path : 'register/:id', 
        component : RegisterComponent, 
        pathMatch: 'full'
    }, {
        path : 'reset-pass/:token',
        component : ResetPassComponent, 
        pathMatch: 'full'
    }, {
        path : 'change-password',
        component : ChangePasswordComponent,
        canActivate: [ AuthGuard ], 
        pathMatch:'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }