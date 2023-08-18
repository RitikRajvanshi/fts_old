import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule,HttpResponse,HttpRequest,HttpParams} from '@angular/common/http';
import { AngularDraggableModule } from 'angular2-draggable';
import { AuthGuard } from '../AuthGaurd/auth.guard';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,CollapseModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    AngularDraggableModule
  ],
  providers: [AuthGuard]
})
export class LoginModule { }
