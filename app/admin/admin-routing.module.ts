import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDepartmentMappingComponent } from './user-department-mapping/user-department-mapping.component';
// import { EditProfileComponent } from '../share/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from '../share/change-password/change-password.component';
import { AddNewDepartmentComponent } from './add-new-department/add-new-department.component';
// import { DashboardComponent } from '../share/dashboard/dashboard.component';

import { DepartmentInfoComponent } from '../share/department-info/department-info.component';
import { StaffInfoComponent } from '../share/staff-info/staff-info.component';
import { BroadcastMessageComponent } from '../share/broadcast-message/broadcast-message.component';
// import { ReopenClosedComponent } from '../share/reopen-closed/reopen-closed.component';
// import { GuestMessageComponent } from '../share/guest-message/guest-message.component';
// import { FileCloseComponent } from '../share/file-close/file-close.component';

import { ManageHODComponent } from '../share/manage-hod/manage-hod.component';
import { ManageDesignationComponent } from '../share/manage-designation/manage-designation.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { SuggestionsInfoComponent } from '../share/suggestions-info/suggestions-info.component';
import { FtsDbdesignComponent } from '../share/fts-dbdesign/fts-dbdesign.component';
import { OrganizationHolidayComponent } from '../share/organization-holiday/organization-holiday.component';
import { FileCategoriesComponent } from '../share/file-categories/file-categories.component';
import { FileHoldingInformationComponent } from '../share/file-holding-information/file-holding-information.component';
import { ManageFileHolidaysComponent } from '../share/manage-file-holidays/manage-file-holidays.component';
import { ManageOrganizationHolidayComponent } from '../share/manage-organization-holiday/manage-organization-holiday.component';
import { LeaveInfoComponent } from '../share/leave-info/leave-info.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { AllFileTrackerComponent } from './all-file-tracker/all-file-tracker.component';
import { TotalNoOfFilesComponent } from '../share/total-no-of-files/total-no-of-files.component';
import { UpdateSuggestionsComponent } from './update-suggestions/update-suggestions.component';
import { TrainingVideoComponent } from '../share/training-video/training-video.component';
import { HelpComponent } from '../share/help/help.component';
import { AuthGuard } from '../AuthGaurd/auth.guard';
import { GenerateReportComponent } from '../share/generate-report/generate-report.component';
import { HoldingFilesDatewiseReportComponent} from '../share/holding-files-datewise-report/holding-files-datewise-report.component';

const routes: Routes = [
  {
    path: 'welcome', component: AdminComponent , canActivate: [AuthGuard],
    children: [
      { path: '', component: AddDepartmentComponent, canActivate: [AuthGuard]  },
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'add-department', component: AddDepartmentComponent, canActivate: [AuthGuard]  },
      { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard]  },
      { path: 'user-department-mapping', component: UserDepartmentMappingComponent, canActivate: [AuthGuard]  },
      // { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
      { path: 'add-new-department', component: AddNewDepartmentComponent, canActivate: [AuthGuard] },
      { path: 'broad-cast-message', component: BroadcastMessageComponent, canActivate: [AuthGuard]  },
      // { path: 'reopen-closed', component: ReopenClosedComponent, canActivate: [AuthGuard]  },
      // { path: 'guest-message', component: GuestMessageComponent, canActivate: [AuthGuard]  },
      
      { path: 'department-info', component: DepartmentInfoComponent, canActivate: [AuthGuard]  },
      { path: 'staff-info', component: StaffInfoComponent, canActivate: [AuthGuard]  },
      { path: 'manage-HOD', component: ManageHODComponent, canActivate: [AuthGuard] },
      { path: 'manage-designation', component: ManageDesignationComponent, canActivate: [AuthGuard] },
      { path: 'manage-user', component: ManageUserComponent, canActivate: [AuthGuard] },
      { path: 'suggestions-info', component: SuggestionsInfoComponent, canActivate: [AuthGuard] },
      { path: 'fts-dbdesign', component: FtsDbdesignComponent, canActivate: [AuthGuard] },
      { path: 'organization-holiday', component: OrganizationHolidayComponent, canActivate: [AuthGuard] },
      { path: 'file-categories', component: FileCategoriesComponent, canActivate: [AuthGuard] },
      { path: 'file-holding-information', component: FileHoldingInformationComponent, canActivate: [AuthGuard] },
      { path: 'manage-file-holdays', component: ManageFileHolidaysComponent, canActivate: [AuthGuard] },
      { path: 'manage-organization-holiday', component: ManageOrganizationHolidayComponent, canActivate: [AuthGuard] },
      { path: 'leave-info', component: LeaveInfoComponent, canActivate: [AuthGuard] },
      { path: 'credentials', component: CredentialsComponent, canActivate: [AuthGuard] },
      { path: 'all-file-tracker', component: AllFileTrackerComponent, canActivate: [AuthGuard] },
      { path: 'total-no-of-files', component: TotalNoOfFilesComponent, canActivate: [AuthGuard] },
      { path: 'update-suggestions', component: UpdateSuggestionsComponent, canActivate: [AuthGuard] },
      { path: 'training-video', component: TrainingVideoComponent, canActivate: [AuthGuard]  },
      { path: 'help', component: HelpComponent, canActivate: [AuthGuard]  },
      { path: 'generate-report', component: GenerateReportComponent, canActivate: [AuthGuard]  },
      { path: 'holding-files-datewise-report', component: HoldingFilesDatewiseReportComponent, canActivate: [AuthGuard]  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


