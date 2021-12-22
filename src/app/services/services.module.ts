import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgxImageCompressService } from 'ngx-image-compress';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { AppointmentService } from './appointment.service';
import { ProfileService } from './profile.service';
import { ProviderService } from './provider.service';
import { Healthcareservices } from './myservice.service';
import { PractitionersService } from './practitioners.service';
import { ProviderScheduleService } from './provider-schedule.service';
import { PaymentService } from './payment.service';
import { PromocodeService } from './promocode.service';

@NgModule()
export class ServicesModule { 
    static forRoot(): ModuleWithProviders<ServicesModule> {
        return {
            ngModule: ServicesModule,
            providers: [  
                AuthService,
                GlobalService,
                AppointmentService,
                ProfileService,
                NgxImageCompressService,
                ProviderService,
                Healthcareservices,
                PractitionersService,
                ProviderScheduleService,
                PaymentService,
                PromocodeService
            ]
        }
    }
}
