import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule,HttpResponse,HttpRequest,HttpParams} from '@angular/common/http';
import { DeptInfoComponent } from './dept-info/dept-info.component';
import { StaffInfoComponent } from './staff-info/staff-info.component';
import { ShareModule } from './share/share.module';
import { AngularDraggableModule } from 'angular2-draggable';
import { AuthGuard } from './AuthGaurd/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ForgetPasswordComponent,
    DeptInfoComponent,
    StaffInfoComponent,

   
  ],
  imports: [
    BrowserModule,AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,FormsModule,ReactiveFormsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    ShareModule,
    AngularDraggableModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent ]
})
export class AppModule { }
