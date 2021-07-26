import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../util/auth.guard';

import { AddProfileComponent } from './add-profile/add-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyProfileComponent } from './verify-profile/verify-profile.component';

const routes: Routes = [
    {
        path : 'add-profile',
        component : AddProfileComponent, 
        canActivate: [ AuthGuard ], 
        pathMatch: 'full'
    }, {
        path : 'profile', 
        component: ProfileComponent, 
        canActivate: [ AuthGuard ], 
        pathMatch: 'full'
    }, {
        path : 'profile/:id',
        component: EditProfileComponent, 
        canActivate: [ AuthGuard ], 
        pathMatch: 'full'
    }, {
        path : 'verify-profile', 
        component : VerifyProfileComponent, 
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientsRoutingModule { }
