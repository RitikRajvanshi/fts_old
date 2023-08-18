import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgxSummernoteModule } from 'ngx-summernote';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminComponent } from './admin.component';

import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDepartmentMappingComponent } from './user-department-mapping/user-department-mapping.component';

import { AdminRoutingModule } from './admin-routing.module';
import { ShareModule } from '../share/share.module';
import { AddNewDepartmentComponent } from './add-new-department/add-new-department.component';

import { ManageUserComponent } from './manage-user/manage-user.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { AllFileTrackerComponent } from './all-file-tracker/all-file-tracker.component';
import { UpdateSuggestionsComponent } from './update-suggestions/update-suggestions.component';
import { AuthGuard } from '../AuthGaurd/auth.guard';

@NgModule({
  declarations: [
    NavbarComponent,SidebarComponent,FooterComponent,
    AdminComponent, AddDepartmentComponent, AddUserComponent, UserDepartmentMappingComponent, AddNewDepartmentComponent, ManageUserComponent, CredentialsComponent, AllFileTrackerComponent, UpdateSuggestionsComponent
  
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,NgxSummernoteModule,CollapseModule,AdminRoutingModule,ShareModule,
  ],
  providers: [AuthGuard],
  
})
export class AdminModule { }
