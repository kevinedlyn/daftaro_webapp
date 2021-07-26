import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutingModule } from './components-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { DaftaroSpinnerComponent } from './daftaro-spinner/daftaro-spinner.component';
import { SearchProfileComponent } from './search-profile/search-profile.component';
import { DaftaroSidebarSpinnerComponent } from './daftaro-sidebar-spinner/daftaro-sidebar-spinner.component';

@NgModule({
    declarations: [
        NavbarComponent,
        DaftaroSpinnerComponent,
        SearchProfileComponent,
        DaftaroSidebarSpinnerComponent
    ], imports: [
        ComponentsRoutingModule,
        CommonModule,
        FormsModule, 
        NgbModule
    ], exports: [
        NavbarComponent,
        DaftaroSpinnerComponent,
        SearchProfileComponent,
        DaftaroSidebarSpinnerComponent
    ]
})
export class ComponentsModule { }
