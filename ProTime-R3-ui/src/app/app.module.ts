import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuModule } from 'primeng/tabmenu';
import { HomeComponent } from './home/home.component';
import { HttpDateInterceptorService } from './base/services/http-date-interceptor.service';
import { LoginComponent } from './login/login.component';
import { HttpJwtInterceptorService } from './base/services/http-jwt-interceptor.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpErrorInterceptorService } from './base/services/http-error-interceptor.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabMenuModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: HttpDateInterceptorService
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: HttpJwtInterceptorService
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: HttpErrorInterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
