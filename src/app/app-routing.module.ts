import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from './util/auth.guard';

import { ErrorPageComponent } from './views/statics/error-page/error-page.component';

const routes: Routes = [
    {
        path : '',
        loadChildren: () => import('./views/views.module').then(v => v.ViewsModule)
    }, {
        path : '', 
        loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)
    }, {
        path : '', 
        loadChildren: () => import('./patients/patients.module').then(p => p.PatientsModule)
    }, {
        path : 'error-page/:id',
        component : ErrorPageComponent, 
        pathMatch: 'full'
    }, {
        path : '**', 
        redirectTo: 'error-page/404', 
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

