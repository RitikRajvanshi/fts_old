import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import * as myGlobals from '../../../globalvar';
declare var $;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  Userdata: any;
  registrationid: any;
  userdetail: any;
  username: any;
  department: any;
  designation: any;
  ftpaddress = myGlobals.ftpaddress1;
  img_url: any;

  constructor(private appService: AppService, private getservice: GetServicesService, private router: Router) { }
  isCollapsed = true;

  ngOnInit() {
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.registrationid = this.Userdata.registrationid;
    this.GetProfileDetail();
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  GetProfileDetail() {

    this.getservice.GetProfileData_ShareNavbar(this.registrationid).subscribe(res => {
      this.userdetail = res;

      this.username = this.userdetail[0].first_name + " " + this.userdetail[0].last_name;
      this.department = this.userdetail[0].departmentname;
      this.designation = this.userdetail[0].designationname;

      if (this.userdetail[0].employeepic == null || this.userdetail[0].employeepic == '') {
        this.img_url = this.ftpaddress + '/Profileimages/noImageAvailable.jpg';
      }
      else {
        this.img_url = this.userdetail[0].employeepic;;
      }

    },
      error => alert(error),
      () => console.log('Finished')
    );

  }


  wantlogout(){
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log Out'
    }).then((result) => {
      if (result.value) {
        this.logout();
      }
    })
   }
  

   logout(){
    sessionStorage.removeItem('LoginStatus');
    this.router.navigate(['/login']);
    
   }




}
