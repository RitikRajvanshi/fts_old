import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetServicesService } from 'src/app/services/get-services.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  validatingForm: any;
  lbldanger:any;
  lblsuccess:any;
  forgetpassword = {
    
    email: '',
    
  };

  constructor(private router:Router,private getService:GetServicesService) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    const emailRegex = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
    const MobNoregx = '[0-9]{10}';
    this.validatingForm = new FormGroup({
     
      email: new FormControl(null, [ Validators.required, Validators.pattern(emailRegex) ]),
   
      
    });
  }

 


ForgetPassword(){
  if(this.validatingForm.invalid){
 
    this.validatingForm.controls['email'].markAsTouched()
    
  }
  else{
    //this.lblsuccess="Coming Soon..."
    this.getService.getForgotPassword(this.forgetpassword.email).subscribe(
      (data: any) => {
        console.log(data.success, "data status");
        if(data.success==true)
        {
          Swal.fire({
            type: 'success',
            text: 'Mail send successfully.',
            showConfirmButton: false,
            timer: 2000
          })    
        }
        else{
          Swal.fire({
            type: 'warning',
            text: 'No user found ? Please recheck email',
            showConfirmButton: false,
            timer: 2000
          })  
          
        }
      });
    this.clear();
    // setTimeout(() => {
     
    //   this.lblsuccess='';
    
    // }, 5000);
  

  }

}


clear(){

  this.forgetpassword.email='';
  this.validatingForm.reset();
 
}



}
