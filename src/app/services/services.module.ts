import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgxImageCompressService } from 'ngx-image-compress';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { AppointmentService } from './appointment.service';
import { ProfileService } from './profile.service';
import { ProviderService } from './provider.service';

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
                ProviderService
            ]
        }
    }
}
