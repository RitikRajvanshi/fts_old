import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-department-mapping',
  templateUrl: './user-department-mapping.component.html',
  styleUrls: ['./user-department-mapping.component.scss']
})
export class UserDepartmentMappingComponent implements OnInit {

  departmentdetail = [];
  departmentUserDetail = [];
  departmentMappingData = {
    dept_id: '',
    registration_id: '',
  }
  CurrentDepartment:string;
  showLoader:boolean=false;
  constructor(private activatedRoute: ActivatedRoute, private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.GetDepartment();
    this.GetEmployeeNameData();
  }


  GetDepartment() {
    this.getservice.GetAllDepartment_forUserMappingDepartment().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.departmentdetail = data.result;
          var obj = {
            id: 0,
            departmentname: '--Please Select Department--'
          }
          this.departmentdetail.splice(0, 0, obj);
          this.departmentMappingData.dept_id = this.departmentdetail[0].id;
          this.showLoader=false;
          //this.departmentMappingData.olddepartment_head = this.departmentdetail[0].department_head;
        }
        else {
          this.departmentdetail = [];
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
    this.getservice.GetAllEmployeeProfileData_ForUserDepartmentMapping().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          var obj = {
            registration_id: 0,
            first_name: '--Please Select User Name--',
          }
          this.departmentUserDetail = data.result;
          this.departmentUserDetail.splice(0, 0, obj);
          this.departmentMappingData.registration_id = this.departmentUserDetail[0].registration_id;
          this.CurrentDepartment = this.departmentUserDetail[0].departmentname;
        }
        else {
          this.departmentUserDetail = [];
        }
      });
  }

  selectDepartment(args) {
    this.departmentMappingData.dept_id = this.departmentdetail[args.target.selectedIndex].id;
  }

  selectUser(args) {
    this.departmentMappingData.registration_id = this.departmentUserDetail[args.target.selectedIndex].registration_id;
    this.CurrentDepartment = this.departmentUserDetail[args.target.selectedIndex].departmentname;
  }


  async  submit_map() {

    if (this.departmentMappingData.registration_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select User Name.',
        timer: 2000
      })
    }
    else if (this.departmentMappingData.dept_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Department.',
        timer: 2000
      })
    }
    else {
      // var hodCheck = await this.getservice.hod_check(this.departmentMappingData.registration_id);
      // if (hodCheck.result[0].count == '0') {

        this.postservice.userbased_departmentmapping(this.departmentMappingData).subscribe(res => {
          if (res.status == true) {
            Swal.fire({
              type: 'success',
              text: 'Department mapped successfully.',
              showConfirmButton: false,
              timer: 2500
            });
            this.GetDepartment();
            this.GetEmployeeNameData();
          }
        });

      // }
      // else {
      //   Swal.fire({
      //     type: 'error',
      //     text: 'This user is already H.O.D in other department. Kindly change to another user.',
      //     showConfirmButton: false,
      //     timer: 2500
      //   })
      // }
    }
  }


}
