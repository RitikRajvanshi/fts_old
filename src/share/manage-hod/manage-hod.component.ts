import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-hod',
  templateUrl: './manage-hod.component.html',
  styleUrls: ['./manage-hod.component.scss']
})
export class ManageHODComponent implements OnInit {
  departmentdetail = [];
  departmentUserDetail = [];
  manageHodData = {
    dept_id: '',
    olddepartment_head: '',
    registration_id: '',
    newdepartment_head: ''



  }
  showLoader:boolean=false;
  constructor(private activatedRoute: ActivatedRoute, private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.GetDepartment();
    this.GetEmployeeNameData();
  }



  GetDepartment() {
    this.getservice.GetAllDepartment_forManageHOD().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.departmentdetail = data.result;
          var obj = {
            id: 0,
            departmentname: '--Please Select Department--',
            first_name: '',
            last_name:''
          }
          this.departmentdetail.splice(0, 0, obj);
          this.manageHodData.dept_id = this.departmentdetail[0].id;
          this.manageHodData.olddepartment_head = this.departmentdetail[0].first_name + ' ' + this.departmentdetail[0].last_name;
          this.showLoader=false;
        }
        else {
          this.showLoader=false;
          // var obj = {

          //   id: 0,
          //   departmentname: '--Choose Department--',
          // }
          // this.departmentdetail.splice(0, 0, obj);
        }
      });
  }



  GetEmployeeNameData() {
    this.getservice.GetAllEmployeeProfileData_forManageHOD().subscribe(
      (data: any) => {
        if (data.result.length > 0) {

          var obj = {
            registration_id: 0,
            employeename: '--Please Select User Name--',
          }

          this.departmentUserDetail = data.result;
          this.departmentUserDetail.splice(0, 0, obj);
          this.manageHodData.registration_id = this.departmentUserDetail[0].registration_id;
          this.manageHodData.newdepartment_head = this.departmentUserDetail[0].registration_id;
          // if (this.departmentUserDetail[0].last_name == null || this.departmentUserDetail[0].last_name == '') {
          //   this.manageHodData.newdepartment_head = this.departmentUserDetail[0].first_name;
          // }
          // else {
          //   this.manageHodData.newdepartment_head = this.departmentUserDetail[0].first_name + this.departmentUserDetail[0].last_name;
          // }

        }
        else {
          this.departmentUserDetail = [];
        }
      });
  }



  selectDepartment(args) {
    this.manageHodData.dept_id = this.departmentdetail[args.target.selectedIndex].id;
    this.manageHodData.olddepartment_head = this.departmentdetail[args.target.selectedIndex].first_name + ' ' + this.departmentdetail[args.target.selectedIndex].last_name;
  }

  changeDepartmentHead(args) {
    this.manageHodData.registration_id = this.departmentUserDetail[args.target.selectedIndex].registration_id;
    this.manageHodData.newdepartment_head = this.departmentUserDetail[args.target.selectedIndex].registration_id;
    // if (this.departmentUserDetail[args.target.selectedIndex].last_name == null || this.departmentUserDetail[args.target.selectedIndex].last_name == '') {
    //   this.manageHodData.newdepartment_head = this.departmentUserDetail[args.target.selectedIndex].first_name;
    // }
    // else {
    //   this.manageHodData.newdepartment_head = this.departmentUserDetail[args.target.selectedIndex].first_name + this.departmentUserDetail[args.target.selectedIndex].last_name;
    // }

  }

  assignHOD() {
    if (this.manageHodData.dept_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Department.',
        timer: 2000
      })
    }
    else if (this.manageHodData.registration_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select User Name.',
        timer: 2000
      })
    }
    else {
      this.postservice.updateHOD(this.manageHodData).subscribe(res => {
        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            text: 'Department H.O.D updated successfully.',
            showConfirmButton: false,
            timer: 1500,
          });

          this.GetDepartment();
          this.GetEmployeeNameData();
        }

      })
    }
  }

}
