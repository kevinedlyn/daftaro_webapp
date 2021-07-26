import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ComponentsModule } from '../components/components.module';
import { ViewsRoutingModule } from './views-routing.module';

import { LandingComponent } from './landing/landing.component';

import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentIndexComponent } from './appointment/appointment-index/appointment-index.component';
import { AppointmentDetailComponent } from './appointment/appointment-detail/appointment-detail.component';

import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptIndexComponent } from './receipt/receipt-index/receipt-index.component';
import { ReceiptDetailComponent } from './receipt/receipt-detail/receipt-detail.component';

import { VerifyRegisterComponent } from './verify-register/verify-register.component';

import { ErrorPageComponent } from './statics/error-page/error-page.component';
import { PhoneVerifiedComponent } from './statics/phone-verified/phone-verified.component';
import { EmailVerifiedComponent } from './statics/email-verified/email-verified.component';

@NgModule({
    declarations: [
        LandingComponent,
        AppointmentComponent,
        AppointmentIndexComponent,
        AppointmentDetailComponent,
        ReceiptComponent,
        ReceiptIndexComponent,
        ReceiptDetailComponent,
        VerifyRegisterComponent,
        ErrorPageComponent,
        PhoneVerifiedComponent,
        EmailVerifiedComponent
    ], imports: [
        ComponentsModule,
        CommonModule,
        NgbModule,
        FormsModule,
        ScrollingModule,
        ViewsRoutingModule
    ]
})
export class ViewsModule { }