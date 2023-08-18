import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DepartmentInfoComponent } from './department-info/department-info.component';
import { StaffInfoComponent } from './staff-info/staff-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReopenClosedComponent } from './reopen-closed/reopen-closed.component';
import { BroadcastMessageComponent } from './broadcast-message/broadcast-message.component';
import { GuestMessageComponent } from './guest-message/guest-message.component';
import { FileCloseComponent } from './file-close/file-close.component';
import { FileInitiationComponent } from './file-initiation/file-initiation.component';
import { FileOnMyDeskComponent } from './file-on-my-desk/file-on-my-desk.component';
import { FileReviewComponent } from './file-review/file-review.component';
import { FileMoveComponent } from './file-move/file-move.component';
import { FileReceiveComponent } from './file-receive/file-receive.component';
import { TrackingFileComponent } from './tracking-file/tracking-file.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { DisplayNotesComponent } from './display-notes/display-notes.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ManageHODComponent } from './manage-hod/manage-hod.component';
import { ManageDesignationComponent } from './manage-designation/manage-designation.component';
import { FtsDbdesignComponent } from './fts-dbdesign/fts-dbdesign.component';
import { SuggestionsInfoComponent } from './suggestions-info/suggestions-info.component';
import { OrganizationHolidayComponent } from './organization-holiday/organization-holiday.component';

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FileCategoriesComponent } from './file-categories/file-categories.component';
import { FileHoldingInformationComponent } from './file-holding-information/file-holding-information.component';
import { ManageFileHolidaysComponent } from './manage-file-holidays/manage-file-holidays.component';
import { ManageOrganizationHolidayComponent } from './manage-organization-holiday/manage-organization-holiday.component';
import { MatSelectSearchModule } from '../mat-select-search/mat-select-search.module';
import { LeaveInfoComponent } from './leave-info/leave-info.component';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,





} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TotalNoOfFilesComponent } from './total-no-of-files/total-no-of-files.component';
import { TrainingVideoComponent } from './training-video/training-video.component';
import { HelpComponent } from './help/help.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { HoldingFilesDatewiseReportComponent } from './holding-files-datewise-report/holding-files-datewise-report.component';

@NgModule({
  exports: [
    // CDK
    
 
    
    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    // Mat-select-search
    MatSelectSearchModule,
    
  ]
  
})
export class MaterialModule {}


@NgModule({
  declarations: [
    ChangePasswordComponent,EditProfileComponent, DepartmentInfoComponent, StaffInfoComponent,DashboardComponent,
    ReopenClosedComponent, BroadcastMessageComponent, GuestMessageComponent, FileCloseComponent,
    FileInitiationComponent, FileOnMyDeskComponent, FileReviewComponent,
    FileMoveComponent, FileReceiveComponent, TrackingFileComponent,
    EditFileComponent, DisplayNotesComponent,AddNotesComponent, ManageHODComponent, ManageDesignationComponent, FtsDbdesignComponent, SuggestionsInfoComponent, OrganizationHolidayComponent, FileCategoriesComponent, FileHoldingInformationComponent, ManageFileHolidaysComponent, ManageOrganizationHolidayComponent, LeaveInfoComponent, 
    TotalNoOfFilesComponent, TrainingVideoComponent, HelpComponent,GenerateReportComponent,HoldingFilesDatewiseReportComponent
   
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,NgxSummernoteModule,NgxMyDatePickerModule.forRoot(),MaterialModule, RouterModule,AngularDraggableModule
  ]
})
export class ShareModule { }
