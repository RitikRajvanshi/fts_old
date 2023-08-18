import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { PostServicesService } from '../../services/post-services.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  Userdata:any;
  validatingForm:any;
  MailInfo={
    userEmail:'',
    newPassword:''
  }
  changepassword={
    email:'',
    oldpassword:'',
    newpassword:'',
    passwordConfirm:''
  }
  password_msg:string;
  showLoader:boolean=false;
  constructor(private loginservice:LoginService,private postService:PostServicesService) { }

  ngOnInit() {
    //this.showLoader=true;
    this.Userdata  = JSON.parse(sessionStorage.getItem('LoginStatus'));
    if(this.Userdata.EmailID){
      this.changepassword.email=this.Userdata.EmailID;
      this.MailInfo.userEmail=this.Userdata.EmailID;
    }else{
      this.changepassword.email=this.Userdata.EmailID;
      this.MailInfo.userEmail=this.Userdata.EmailID;
    }

    this.validation();
  }

  validation() {

    this.validatingForm = new FormGroup({
     
      oldpassword: new FormControl(null, Validators.required),
      newpassword: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required),
      
     
      
    },this.passwordConfirming);
  }
  passwordConfirming(c: FormGroup) {

    if (c.get('newpassword').value !== c.get('passwordConfirm').value) {
      c.get('passwordConfirm').setErrors({ 'noMatch': true });
      return { invalid: true };
    }
  }


  ChangePassword(){

    // Swal.fire({
    //   type: 'error',
    //   text: 'Password feature has been stoped for next two weeks. ',
    //   showConfirmButton: false,
    //   timer: 5000
    // });
    if(this.validatingForm.invalid){

      this.validatingForm.controls['oldpassword'].markAsTouched(),
      this.validatingForm.controls['newpassword'].markAsTouched(),
      this.validatingForm.controls['passwordConfirm'].markAsTouched()
     
    }

    else{
      this.loginservice.ChangePassword(this.changepassword).subscribe(
        data => {
       
       if(data == '1'){
        this.MailInfo.newPassword=this.changepassword.newpassword;
        Swal.fire({
          type: 'success',
          text: 'Password updated successfully.',
          showConfirmButton: false,
          timer: 2000
        })
       
      
        this.password_msg = '';
        this.clear();
        this.sendMail();
    }else
    {
      this.password_msg = 'Old password not correct.';
    }
    
   
        },
        error => {

          Swal.fire({
            type: 'error',
            text: 'Old password not correct.',
            showConfirmButton: false,
            timer: 2000
            
          })
         
        }
      );
    }

    
   }


   clear(){
    this.changepassword.newpassword='';
    this.changepassword.oldpassword='';
    this.changepassword.passwordConfirm='';
    this.validatingForm.reset();
}

sendMail(){
  this.postService.sendMailForChangePassword(this.MailInfo).subscribe(
    (data: any) => {
      if(data.status==true)
      {
      //  Swal.fire('Notes added successfully.')
       
      }
      else{

      }


    });


}  




}
