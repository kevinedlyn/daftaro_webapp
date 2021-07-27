import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../util/auth.guard';

import { LandingComponent } from './landing/landing.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ReceiptComponent } from './receipt/receipt.component';

import { VerifyRegisterComponent } from './verify-register/verify-register.component';

import { ErrorPageComponent } from './statics/error-page/error-page.component';
import { PhoneVerifiedComponent } from './statics/phone-verified/phone-verified.component';
import { EmailVerifiedComponent } from './statics/email-verified/email-verified.component';
import { BookAppoinmentComponent } from './book-appoinment/book-appoinment.component';

const routes: Routes = [
    {
        path : '',
        component: LandingComponent,
        pathMatch: 'full'
    }, {
        path : 'appointment',
        component: AppointmentComponent, 
        canActivate: [ AuthGuard ], 
        pathMatch: 'full'
    }, {
        path : 'receipt', 
        component: ReceiptComponent, 
        canActivate: [ AuthGuard ], 
        pathMatch: 'full'
    }, {   
        path : 'verify-register', 
        component : VerifyRegisterComponent, 
        pathMatch: 'full'
    }, {
        path : 'email-verified',
        component : EmailVerifiedComponent, 
        pathMatch: 'full'
    }, {
        path : 'phone-verified',
        component : PhoneVerifiedComponent,
        pathMatch: 'full'
    }, {
        path : 'book-appointment',
        component : BookAppoinmentComponent, 
        canActivate: [ AuthGuard ], 
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ViewsRoutingModule { }