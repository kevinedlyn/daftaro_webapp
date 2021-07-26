import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { ComponentsModule } from '../components/components.module';

import { ProfileComponent } from './profile/profile.component';
import { VerifyProfileComponent } from './verify-profile/verify-profile.component';
import { DetailProfileComponent } from './detail-profile/detail-profile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
    declarations: [
        ProfileComponent,
        VerifyProfileComponent,
        DetailProfileComponent,
        AddProfileComponent,
        EditProfileComponent
    ], imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PatientsRoutingModule,
        ComponentsModule
    ]
})
export class PatientsModule { }