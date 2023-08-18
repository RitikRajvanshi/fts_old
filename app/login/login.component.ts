import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
declare const $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validatingForm: any;
  lblsuccess: any;
  lbldanger: any;
  Login = {
    email: '',
    password: '',
    username: ''

  };
  username_msg: string;
  password_msg: string;
  getEmailData = [];
  emailid_msg: string;
  ModelvalidatingForm: any;
  ModalDropDown: boolean = true;
  ModalNotFoundMsg: boolean = true;

  Userdata: any;

  constructor(private router: Router, private auth: LoginService) { }

  ngOnInit() {
    this.validation();
    this.modelvalidation();

    sessionStorage.removeItem('LoginStatus');

  }
  modelvalidation() {
    this.ModelvalidatingForm = new FormGroup({
      email_id: new FormControl(),
    });
  }

  validation() {
    const emailRegex = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
    const MobNoregx = '[0-9]{10}';
    this.validatingForm = new FormGroup({
      loginUserName: new FormControl(),
      loginMail: new FormControl(null, Validators.required),
      loginPass: new FormControl(null, Validators.required)


    });
  }

  getEmailId(UserName) {

    this.getEmailData = [];

    if (this.Login.username.trim() == undefined || this.Login.username.trim() == null || this.Login.username.trim() == "") {
      this.emailid_msg = 'Required';
      $("#popup").modal("hide");
    }
    else {

      $("#popup").modal("show");
      this.emailid_msg = '';

      this.auth.getEmailId(UserName).subscribe(res => {
        if (res.result.length == 0) {
          this.ModalNotFoundMsg = false;
          this.ModalDropDown = true;
        }
        else {
          this.ModalNotFoundMsg = true;
          this.ModalDropDown = false;
          // this.getEmailData = res.result;


          for (let i = 0; i < res.result.length; i++) {
            if (res.result[i].staff_name.includes("(") || res.result[i].staff_name.includes(")")) {

            }
            else {
              this.getEmailData.push(res.result[i]);
            }
          }




          this.Login.email = this.getEmailData[0].email_id;
        }
      });
    }

  }

  selectchangeforemailid(args) {
    this.Login.email = this.getEmailData[args.target.selectedIndex].email_id;
  }

  getUserName() {
    this.auth.emailExist(this.Login.email).subscribe(res => {
      if (res.result[0].count == 0) {
        this.username_msg = 'User name is invalid.';
      }
      else {
        this.username_msg = '';
      }
    });
  }


  loginnow() {
    if (this.validatingForm.invalid) {
      this.validatingForm.controls['loginMail'].markAsTouched(),
        this.validatingForm.controls['loginPass'].markAsTouched()
    }
    else {

      // if(this.Login.email=="user" && this.Login.password=="1234"){
      //   this.router.navigate(['user/welcome/profile']);
      //   this.cleare();
      // }
      // else if(this.Login.email=="admin" && this.Login.password=="1234"){
      //   this.router.navigate(['admin/welcome/edit-profile']);
      //   this.cleare();
      // }

      // else{
      //   this.lbldanger="invalid username or password"
      // }

      this.auth.SignIn(this.Login).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length === 1) {

            if (data[0].isactive == true) {

              sessionStorage.setItem('LoginStatus', JSON.stringify({
                IsLoggedIn: true,
                registrationid: data[0].registration_id,
                Role: data[0].role,
                EmailID: data[0].email_id,
                Department_id: data[0].department,
                Department_Name: data[0].departmentname
              }));

              if (data[0].role === "1") {
                this.router.navigate(['admin/welcome']);
                this.cleare();
              }
              else {
                this.router.navigate(['user/welcome']);
                this.cleare();
              }

            }
            else {
              Swal.fire({
                type: 'error',
                text: 'This user has been disabled by FTS Admin.',
                showConfirmButton: false,
                timer: 4000
              })
            }



          }
          else {

            this.password_msg = 'Password is invalid.';
            //this.lbldanger = "Invalid credentials.Please try again"
            //this.cleare();
          }
        },
        error => console.log('Error at login.')

      );

    }

  }
  cleare() {
    this.Login.email = '';
    this.Login.password = '';
    this.validatingForm.reset();
  }
}
