import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
// used to create fake backend
import {fakeBackendLoginProvider, fakeBackendProvider} from './_helpers';

import {AppRoutingModule} from './app-routing.module';
import {ErrorInterceptor, BasicAuthInterceptor, ErrorAuthInterceptor} from './_helpers';
import {AppComponent} from './app.component';
import {AlertComponent} from './_components';
import {HomeComponent} from './home';
import {LoginComponent} from './login';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorAuthInterceptor, multi: true},
    // provider used to create fake backend
    fakeBackendProvider,
    fakeBackendLoginProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
