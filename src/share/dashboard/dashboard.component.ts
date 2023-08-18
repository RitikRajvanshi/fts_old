import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { TrackingFileService } from 'src/app/services/tracking-file.service';
import * as myGlobals from '../../globalvar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Userdata: any;
  registrationid: any;
  userdetail: any;
  username: any;
  department: any;
  designation: any;
  timeStamp = (new Date()).getTime();
  url: any;
  FileTrackerCount: any;
  ftpaddress = myGlobals.ftpaddress1;
  totalFileCount: any;
  totalFileTobeReceivedCount: any;
  constructor(private trackingfile: TrackingFileService, private getservice: GetServicesService, private router: Router) {
    this.getservice.currentFileCount.subscribe(message => this.totalFileCount = message)
    this.getservice.currentFileToBeReceivedCount.subscribe(message => this.totalFileTobeReceivedCount = message)
  }
  totalFileCountForUprrerHoldingDays:any;

  ngOnInit() {

    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.registrationid = this.Userdata.registrationid;
    this.GetProfileDetail();

  }



  GetProfileDetail() {

    this.getservice.GetProfileData_Dashboard(this.registrationid).subscribe(res => {
      this.userdetail = res;

      this.username = this.userdetail[0].first_name + " " + this.userdetail[0].last_name;
      this.department = this.userdetail[0].departmentname;
      this.designation = this.userdetail[0].designationname;

      if (this.userdetail[0].employeepic == null || this.userdetail[0].employeepic == '') {
        this.url = this.ftpaddress + '/Profileimages/noImageAvailable.jpg';
      }
      else {
        this.url = this.userdetail[0].employeepic;
      }

      this.getFileTrackerCount(this.registrationid, this.userdetail[0].department);

      this.gettotalfiles_morethanholdingdays(this.registrationid, this.userdetail[0].department);

    },
      error => alert(error),
      () => console.log('Finished')
    );

  }
  gettotalfiles_morethanholdingdays(registrationid: any, department: any) {
    this.getservice.gettotalfiles_morethanholdingdays(registrationid, department).subscribe(res => {
      if (res.result.length > 0) {

        this.totalFileCountForUprrerHoldingDays = res.result.length;

      }
      else
      {
        this.totalFileCountForUprrerHoldingDays = 0;
      }
    })
  }


  public getLinkPicture() {
    if (this.timeStamp) {
      return this.url + '?' + this.timeStamp;
    }
    return this.url;
  }

  editprofile() {
    this.router.navigate(['/user/welcome/edit-profile']);
  }


  getFileTrackerCount(RegistrationId, DepartmentId) {
    this.trackingfile.getFileName_forfiletracking(RegistrationId, DepartmentId).subscribe(res => {
      this.FileTrackerCount = res.result.length;
    })
  };

  redirectToFileReceive() {
    // this.router.navigate(['/user/welcome/file-on-my-desk']);
    this.router.navigate(['/user/welcome/file-receive']);
  }

  redirectToFileOnMyDesk() {
    // this.router.navigate(['/user/welcome/file-on-my-desk']);
    this.router.navigate(['/user/welcome/file-on-my-desk']);
  }

  redirectToFileCreation() {
    this.router.navigate(['/user/welcome/file-initiation']);
  }



  redirectToMasterDepartmentInformation() {
    // this.router.navigate(['/user/welcome/file-on-my-desk']);
    this.router.navigate(['/user/welcome/department-info']);
  }
  redirectToStaffInformation() {
    // this.router.navigate(['/user/welcome/file-on-my-desk']);
    this.router.navigate(['/user/welcome/staff-info']);
  }

  redirectToOrganizationHoliday() {
    // this.router.navigate(['/user/welcome/file-on-my-desk']);
    this.router.navigate(['/user/welcome/organization-holiday']);
  }

  redirectToFileHoldingDays() {
    // this.router.navigate(['/user/welcome/file-on-my-desk']);
    this.router.navigate(['/user/welcome/file-holding-information']);
  }

  redirectToFileTracker() {
    // this.router.navigate(['/user/welcome/file-on-my-desk']);
    this.router.navigate(['/user/welcome/tracking-file']);
  }



}

