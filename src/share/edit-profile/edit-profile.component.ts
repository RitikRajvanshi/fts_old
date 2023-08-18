import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { GetServicesService } from 'src/app/services/get-services.service';
import * as myGlobals from '../../globalvar';
import { PostServicesService } from 'src/app/services/post-services.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  validatingForm: any;
  totalpath: any;
  Userdata: any;
  departmentdetail = [];


  profile = {
    registrationid: '',
    first_name: '',
    last_name: '',
    email: '',
    mobileno: '',
    departmentid: '',
    //department: '',
    address: '',
    info: '',
    image: '',
    designation: '',
    designationid: '',
    employeeid: '',
    code: '',
    pcode: '',
    intercom_number: '',
    nickname: ''

  }
  datavalue: any;
  profiledetail = [];

  url: any;
  ftpaddress = myGlobals.ftpaddress1;
  timeStamp = (new Date()).getTime();
  loading: boolean = false;
  profileimagepath: any;
  constructor(private router: Router, private postService: PostServicesService, private loginservice: LoginService, private ele: ElementRef, private getservice: GetServicesService, private postservice: PostServicesService) { }

  ngOnInit() {
    this.ele.nativeElement.querySelector('#spinner').style.visibility = 'hidden';
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.profile.registrationid = this.Userdata.registrationid;
    this.validation();
    this.GetDepartment();
    this.GetProfileDetail();


  }

  validation() {
    const emailRegex = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
    const MobNoregx = '[0-9]{10}';
    this.validatingForm = new FormGroup({

      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern(emailRegex)]),
      mobileno: new FormControl(null, [Validators.required, Validators.pattern(MobNoregx),Validators.maxLength(10)]),
      Department: new FormControl(null, Validators.required),
      Address: new FormControl(null, Validators.required),
      Info: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      employeeid: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
      pcode: new FormControl(null, Validators.required),
      intercom_number: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      nickname: new FormControl(null, Validators.required)

    });
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {

      if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png') {
        var reader = new FileReader();

        var abc = reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event: Event) => { // called once readAsDataURL is completed
          this.url = reader.result;
          this.profile.image = this.url;
          this.UploadImage(this.profile);
        }
      }


    }
  }


  GetProfileDetail() {
    this.ele.nativeElement.querySelector('#spinner').style.visibility = 'visible';
    this.getservice.GetProfileDetails(this.profile.registrationid).subscribe(res => {
      this.profiledetail = res;
      this.ele.nativeElement.querySelector('#spinner').style.visibility = 'hidden';

      this.profile.first_name = this.profiledetail[0].first_name;
      this.profile.last_name = this.profiledetail[0].last_name;
      this.profile.email = this.profiledetail[0].email_id;
      //this.profile.designation = this.profiledetail[0].designation;
      this.profile.designation = this.profiledetail[0].designationname;
      this.profile.designationid = this.profiledetail[0].designation;
      this.profile.employeeid = this.profiledetail[0].employee_id;
      this.profile.code = this.profiledetail[0].code;
      this.profile.pcode = this.profiledetail[0].p_code;
      this.profile.mobileno = this.profiledetail[0].mobileno;
      this.profile.departmentid = this.profiledetail[0].department;
      // this.profile.department = this.profiledetail[0].departmentname;
      this.profile.address = this.profiledetail[0].employeeaddress;
      this.profile.info = this.profiledetail[0].employeeinfo;
      this.profile.intercom_number = this.profiledetail[0].intercom_number;
      this.profile.nickname = this.profiledetail[0].nick_name;

      if (this.profiledetail[0].employeepic == null || this.profiledetail[0].employeepic == '') {
        this.profile.image = 'noImageAvailable.jpg';
        this.url = this.ftpaddress + '/Profileimages/noImageAvailable.jpg';

      }
      else {
        //   this.profile.image = this.profiledetail[0].employeepic;
        //  this.url = this.ftpaddress + '/Profileimages/' + this.profiledetail[0].employeepic;
        this.url = this.profiledetail[0].employeepic;;
      }


      this.timeStamp = (new Date()).getTime();

      //   this.Pathofimage();

    },
      error => alert(error),
      () => console.log('Finished')
    );

  }

  // Pathofimage() {
  //   if (this.profile.image === '' || this.profile.image === 'undefined ' || this.profile.image === null) {
  //     this.totalpath = 'assets/images/user.jpg' ;
  //   }else {
  //     this.url = this.ftpaddress +'/Profileimages/' + this.profiledetail[0].employeepic;

  //   }

  // }

  // UploadImage() {
  //   const files = this.ele.nativeElement.querySelector('#File1').files;
  //   const formData: FormData = new FormData();
  //   const file = files[0];
  //   if (files.length > 0) {
  //     this.profile.image = file.name;
  //     formData.append('file', file, file.name);
  //     this.profile.image = file.name;
  //     this.postservice.UploadProfilePick(formData, this.profile.registrationid).subscribe(
  //       data => {
  //         if (data.status = true) {

  //           this.ele.nativeElement.querySelector('#File1').value = '';
  //           //this.GetProfileDetail();
  //         }
  //       },
  //       error => console.log('Error')
  //     );
  //   }

  // }
  UploadImage(url) {

    this.postservice.UploadProfilePicture(this.profile).subscribe(
      data => {
        if (data.status = true) {

          this.ele.nativeElement.querySelector('#File1').value = '';
          //this.GetProfileDetail();
        }
      },
      error => console.log('Error')
    );
  }

  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  UpdateProfile() {

    // if (this.validatingForm.invalid) {
    //   // this.validatingForm.controls['name'].markAsTouched();
    //   // this.validatingForm.controls['email'].markAsTouched();
    //   // this.validatingForm.controls['mobileno'].markAsTouched();
    //   // this.validatingForm.controls['department'].markAsTouched();
    //   // this.validatingForm.controls['address'].markAsTouched();
    //   // this.validatingForm.controls['info'].markAsTouched();


    // }
    // else {

    this.postservice.UpdateAdminProfile(this.profile).subscribe(
      data => {

        this.datavalue = data;

        if (data.success == true) {

          this.sendMail();
          Swal.fire({
            type: 'success',
            text: 'Profile updated successfully',
            showConfirmButton: false,
            timer: 2000
          });

        }

        else {
          Swal.fire({
            type: 'error',
            text: 'Server error.',
            showConfirmButton: false,
            timer: 2000
          })
        }
      },
      error => console.log('Error has occured.')
    );
    // }

  }



  // GetProfilephoto(){
  //    this.postservice.GetUpdatedProfilePicturePath( this.profile.registrationid).subscribe(res => {
  //     this.profileimagepath = res;
  //     this.url = this.ftpaddress +'/Profileimages/' + this.profileimagepath[0].employeepic;
  //   },
  //     error => alert(error),
  //     () => console.log('Finished')
  //   );

  // }

  public getLinkPicture() {
    if (this.timeStamp) {
      return this.url + '?' + this.timeStamp;
    }
    return this.url;
  }


  sendMail() {
    this.postService.sendMailForProfileUpdate(this.profile).subscribe(
      (data: any) => {
        if (data.status == true) {
          //  Swal.fire('Notes added successfully.')
        }
        else {
        }
      });

  }


  GetDepartment() {


    this.getservice.GetAllDepartment_forEditProfie().subscribe(
      (data: any) => {
        this.departmentdetail = data.result;
        // this.profile.departmentid=this.departmentdetail[0].id;
      }
    )
  }

  GetDepartmentId(args) {
    this.profile.departmentid = this.departmentdetail[args.target.selectedIndex].id;
  }


}
