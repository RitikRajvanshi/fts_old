import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';

declare const $;

@Component({
  selector: 'app-add-new-department',
  templateUrl: './add-new-department.component.html',
  styleUrls: ['./add-new-department.component.scss']
})
export class AddNewDepartmentComponent implements OnInit {

  Userdata: any;
  departmentdetail = [];
  departmentUserDetail = [];
  //userdetail = [];
  department = {
    departmentName: '',
    departmentEmail: '',
    departmentPassword: '',
    departmentHeadId: '',
    designation_id: '',
    first_name: '',
    last_name: '.'
  }
  validatingForm: any;
  departmentDetail_byId = [];
  designationData = [];


  constructor(private getservice: GetServicesService, private postservice: PostServicesService) { }

  ngOnInit() {

    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    //this.GetProfileDetail(this.Userdata.registrationid);
    this.GetAllEmployeeName();
    this.GetAllDesignation();
    this.validation();
  }

  validation() {

    this.validatingForm = new FormGroup({
      departmentname: new FormControl(null, Validators.required),
      departmentEmail: new FormControl(null, Validators.required),
      departmentPassword: new FormControl(null, Validators.required),

    });
  }

  // GetProfileDetail(registrationid) {

  //   this.getservice.GetProfileData_AddNewDepartment(registrationid).subscribe(res => {
  //     this.userdetail = res;
  //   },
  //     error => alert(error),
  //     () => console.log('Finished')
  //   );

  // }


  GetAllEmployeeName() {
    this.getservice.GetAllEmployeeProfileData_ForAddNewDepartment().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.departmentUserDetail = data.result;
          var obj = {
            registration_id: 0,
            first_name: '--Please Select Department Head Name--',
          }
          this.departmentUserDetail.splice(0, 0, obj);
          this.department.departmentHeadId = this.departmentUserDetail[0].registration_id;
        }
        else {
          this.departmentUserDetail = [];
        }
      });
  }


  GetAllDesignation() {
    this.getservice.GetAllDesignation_forAddNewDepartment().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.designationData = data.result;
          var obj = {
            id: 0,
            designation: '--Please Select Department Head Designation--',
          }
          this.designationData.splice(0, 0, obj);
          this.department.designation_id = this.designationData[0].id;
        }
        else {
          this.designationData = [];
        }
      });
  }

  changeDepartmentHead(args) {
    this.department.departmentHeadId = this.departmentUserDetail[args.target.selectedIndex].registration_id;
  }

  changeDepartmentHeadDesignation(args) {
    this.department.designation_id = this.designationData[args.target.selectedIndex].id;
    this.department.first_name = this.designationData[args.target.selectedIndex].designation;
  }


  AddDepartment() {

    if (this.validatingForm.invalid) {
      this.validatingForm.controls['departmentname'].markAsTouched();
      this.validatingForm.controls['departmentEmail'].markAsTouched();
      this.validatingForm.controls['departmentPassword'].markAsTouched();
    }
    else if (this.department.departmentHeadId == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Department Head Name.',
        timer: 2000
      })
    }
    else if (this.department.designation_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Department Head Designation.',
        timer: 2000
      })
    }
    else {
      this.postservice.addDepartment(this.department).subscribe(
        (data: any) => {
          if (data.result[0].inserttbl_department == '1') {
            Swal.fire({
              type: 'success',
              text: 'Department added successfully.',
              showConfirmButton: false,
              timer: 2000,
            });
            this.validatingForm.reset();
            this.GetAllEmployeeName();
            this.GetAllDesignation();
          }
          else if (data.result == '3') {
            Swal.fire({
              type: 'error',
              text: 'Department name already exist.',
              showConfirmButton: false,
              timer: 2000,
            });
          }
          else {
            Swal.fire({
              type: 'error',
              text: 'Email id already exist.',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      )
    }
  }



}
