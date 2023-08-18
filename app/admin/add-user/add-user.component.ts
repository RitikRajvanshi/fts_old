import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
declare const $;


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  validatingForm: any;
  lbldanger: any;
  lblsuccess: any;
  departmentdetail = [];
  UserData = {
    first_name: '',
    last_name: '',
    departmentid: '',
    departmentname: '',
    email: '',
    password: '',
    Conpassword: '',
    role: '2',
    designation_id: '',
    designation_name: '',
    employeeid: '',
    registration_id:''

  };
  designationdetail = [];
  lbl_Department: any;
  lbl_Designation: any;
  registration_id: any;
  ProfileDetail = [];
  hiddenPassword: boolean = true;
  hiddenConfirmPassword: boolean = true;
  hiddenAddNewUserBtn: boolean = true;
  hiddenUpdateUserBtn: boolean = true;
  title: string;

  constructor(private postservice: PostServicesService, private getservice: GetServicesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {


    this.activatedRoute.queryParams.subscribe(params => {
      this.registration_id = params['registration_id'];
    });

    this.UserData.registration_id = this.registration_id;

    if (this.registration_id == undefined || this.registration_id == null || this.registration_id == '') {
      this.title = "Add New User";
      this.hiddenPassword = false;
      this.hiddenConfirmPassword = false;
      this.hiddenAddNewUserBtn = false;
      this.hiddenUpdateUserBtn = true;
      this.validation();
      this.GetDepartment();
     // this.GetDesignation();
    }
    else {
      this.title = "Update User";
      this.hiddenUpdateUserBtn = false;
      this.departmentdetail = [];
      this.designationdetail = [];
      this.ProfileDetail = [];
      this.validation();
     // this.GetDepartment();
      //this.GetDesignation();
      this.GetProfileDetail(this.registration_id);

    }
  }

  validation() {
    const emailRegex = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
    const MobNoregx = '[0-9]{10}';
    this.validatingForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern(emailRegex)]),
      password: new FormControl(null, Validators.required),
      Conpassword: new FormControl(null, Validators.required),
      employeeid: new FormControl(null, Validators.required),

    }, this.passwordConfirming);
  }

  GetProfileDetail(registrationid) {

    this.getservice.GetProfileData_AddUser(registrationid).subscribe(res => {
      this.ProfileDetail = res;

      this.UserData.first_name = this.ProfileDetail[0].first_name;
      this.UserData.last_name = this.ProfileDetail[0].last_name;
      this.UserData.departmentid = this.ProfileDetail[0].department;
      this.UserData.designation_id = this.ProfileDetail[0].designation;
      this.UserData.employeeid = this.ProfileDetail[0].employee_id;
      this.UserData.email = this.ProfileDetail[0].email_id;
      this.GetDepartment();
    },
      error => alert(error),
      () => console.log('Finished')
    );

  }

  passwordConfirming(c: FormGroup) {

    if (c.get('password').value !== c.get('Conpassword').value) {
      c.get('Conpassword').setErrors({ 'noMatch': true });
      return { invalid: true };
    }
  }



  registerNow() {
    if (this.validatingForm.invalid) {
      this.validatingForm.controls['first_name'].markAsTouched(),
        this.validatingForm.controls['last_name'].markAsTouched(),
        this.validatingForm.controls['email'].markAsTouched(),
        this.validatingForm.controls['password'].markAsTouched(),
        this.validatingForm.controls['Conpassword'].markAsTouched(),
        this.validatingForm.controls['employeeid'].markAsTouched()
    }
    else if (this.UserData.departmentid == '0') {
      // Swal.fire({
      //   type: 'error',
      //   text: 'Please Select Department.',
      //   timer: 2000
      // })
      this.lbl_Department = 'Department required.';
    }
    else if (this.UserData.designation_id == '0') {
      // Swal.fire({
      //   type: 'error',
      //   text: 'Please Select Designation.',
      //   timer: 2000
      // })
      this.lbl_Designation = 'Designation required.';
      this.lbl_Department = '';
    }
    else {
      this.postservice.AddUser(this.UserData).subscribe(res => {
        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            text: 'User added successfully.',
            showConfirmButton: false,
            timer: 1500,
          });

          this.GetDepartment();
          this.GetDesignation();
          this.lbl_Department = '';
          this.lbl_Designation = '';
        }
        else if (res.result == '3') {
          Swal.fire({
            type: 'error',
            text: 'Email id already exist.',
            showConfirmButton: false,
            timer: 1500,
          });

          this.GetDepartment();
          this.GetDesignation();

          this.lbl_Department = '';
          this.lbl_Designation = '';
        }

      });
    }
  }

  updateUser()
  {
    if (this.validatingForm.controls['first_name'].invalid == true || this.validatingForm.controls['last_name'].invalid == true || this.validatingForm.controls['email'].invalid == true || this.validatingForm.controls['employeeid'].invalid == true) {
      this.validatingForm.controls['first_name'].markAsTouched(),
        this.validatingForm.controls['last_name'].markAsTouched(),
        this.validatingForm.controls['email'].markAsTouched(),
        this.validatingForm.controls['employeeid'].markAsTouched()
    }
    else if (this.UserData.departmentid == '0') {
      this.lbl_Department = 'Department required.';
    }
    else if (this.UserData.designation_id == '0') {
      this.lbl_Designation = 'Designation required.';
      this.lbl_Department = '';
    }
    else {
      this.UserData.email= this.UserData.email.trim();
      this.postservice.updateUser(this.UserData).subscribe(res => {
        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            text: 'User updated successfully.',
            showConfirmButton: false,
            timer: 2000,
          });
        }
        else if (res.result == '2') {
          Swal.fire({
            type: 'error',
              text: 'Email Id already exist.',
              showConfirmButton: false,
              timer: 2000,
          });
        }
      });
    }
  }

  GetDepartment() {
    this.getservice.GetAllDepartment().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.departmentdetail = data.result;
          var obj = {
            id: 0,
            departmentname: '--Please Select Department--'
          }
          this.departmentdetail.splice(0, 0, obj);
          if(this.ProfileDetail.length!=0)
          {
            if(this.ProfileDetail[0].department!=null && this.ProfileDetail[0].department!='' && this.ProfileDetail[0].department!=undefined)
            {
              this.UserData.departmentid=this.ProfileDetail[0].department;
            }
            else{
              this.UserData.departmentid = this.departmentdetail[0].id;
              this.UserData.departmentname = this.departmentdetail[0].departmentname;
            }
          }
          
          else{
            this.UserData.departmentid = this.departmentdetail[0].id;
            this.UserData.departmentname = this.departmentdetail[0].departmentname;
          }
          this.GetDesignation();
         
        }
        else {
          this.departmentdetail = [];
        }
      });
  }

  GetDesignation() {
    this.getservice.GetAllDesignation().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.designationdetail = data.result;
          var obj = {
            id: 0,
            designation: '--Please Select Designation--'
          }
          this.designationdetail.splice(0, 0, obj);
          if(this.ProfileDetail.length!=0)
          {
            if(this.ProfileDetail[0].designation!=null && this.ProfileDetail[0].designation!='' && this.ProfileDetail[0].designation!=undefined)
            {
  this.UserData.designation_id=this.ProfileDetail[0].designation
            }
            else{
              this.UserData.designation_id = this.designationdetail[0].id;
              this.UserData.designation_name = this.designationdetail[0].designation;
            }
          }
          
          else{
            this.UserData.designation_id = this.designationdetail[0].id;
            this.UserData.designation_name = this.designationdetail[0].designation;
          }
         
        

        }
        else {
          this.designationdetail = [];
          // var obj = {
          //   id: 0,
          //   departmentname: '--Choose Department--',
          // }
          // this.designationdetail.splice(0, 0, obj);
        }
      });
  }

  selectDepartment(args) {
    this.UserData.departmentid = this.departmentdetail[args.target.selectedIndex].id;
    this.UserData.departmentname = this.departmentdetail[args.target.selectedIndex].departmentname;
  }

  changeDesignation(args) {
    this.UserData.designation_id = this.designationdetail[args.target.selectedIndex].id;
    this.UserData.designation_name = this.designationdetail[args.target.selectedIndex].designation;
  }

  cleare() {
    // this.register.name='';
    // this.register.designation='';
    // this.register.email='';
    // this.register.password='';
    // this.validatingForm.reset();
  }

}
