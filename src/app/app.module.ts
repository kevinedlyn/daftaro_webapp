import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CookieService } from 'ngx-cookie-service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ErrorInterceptorService } from './util/error-interceptor.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';

@NgModule({
    declarations: [
        AppComponent
    ], imports: [
        AppRoutingModule,
        ScrollingModule,
        ServicesModule.forRoot(),
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        InfiniteScrollModule
    ], providers: [
        DatePipe,
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass : ErrorInterceptorService,
            multi: true
        }
    ], bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
