import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { GetServicesService } from 'src/app/services/get-services.service';
import * as myGlobals from '../../globalvar';
import { PostServicesService } from 'src/app/services/post-services.service';

@Component({
  selector: 'app-guest-message',
  templateUrl: './guest-message.component.html',
  styleUrls: ['./guest-message.component.scss']
})
export class GuestMessageComponent implements OnInit {

  Userdata: any;
  Guestlistdetail: any;
  emails=[];
  guest_category:any;
   
  guestdetail = {
     msg: '',
    category:'',
  }


  config = {
   
    tabsize: 2,
    height: 250,
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['codeview', 'undo', 'redo']],
      // ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'link', 'hr']]
      // ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    // tslint:disable-next-line:max-line-length
    fontNames: ['Kruti Dev 010', 'Bauhaus 93', 'Algerian', 'Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times', 'DauphinPlain', 'Times New Roman', 'Calibri']
  };

  
  constructor(private router: Router, private postService: PostServicesService, private loginservice: LoginService, private getservice: GetServicesService, private postservice: PostServicesService) { }

  ngOnInit() {
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));

    this.GetGuestList();
  }

  GetGuestList() {
    this.getservice.GetAllGuestList().subscribe(
      (data: any) => {
        this.Guestlistdetail = data.result;
        var obj = {
          id: 0,
          guestcategory: '--Please Select Guest List--',
        }
        this.Guestlistdetail.splice(0, 0, obj);
        this.guest_category = this.Guestlistdetail[0].id;
       
        //this.Guestlistdetail(this.Guestlistdetail[0].guestcategory);
       // this.GetAllEmails(this.Guestlistdetail[0].guestcategory);
       }

    )

  }

  selectchangefordepartment(args) {
    this.Guestlistdetail.guestcategory = this.Guestlistdetail[args.target.selectedIndex].guestcategory;
    this.GetAllEmails(this.Guestlistdetail.guestcategory);
  }


  GetAllEmails(category) {
    this.emails=[];
    this.getservice.GetAllGuestDetails(category).subscribe(
      data => {
        if(data.status == true){

          for (var i = 0; i < data.result.length; i++) {

           
             this.emails.push(data.result[i].email_id);
             
          }

          console.log(this.emails)

        }
       
    
      },
      error => console.log('Error has occured.')
    );
  }


  SendAllMail(){
    this.postService.SendMailToAllGuestList(this.emails, this.guestdetail.msg).subscribe(data =>{
      if(data.success==true){
        Swal.fire({
          type: 'success',
          text: 'Guest Message Brodcast.',
          showConfirmButton: false,
          timer: 2000
        })
        this.clear();
       } 
     
    });
  } 


  submit()
  {
     //if (this.guest_category == '0') {
    //   Swal.fire({
    //     type: 'error',
    //     text: 'Please Select Guest List.',
    //     timer: 2000
    //   })
    // }
    // else {
   // this.SendAllMail();
  //}
   Swal.fire({
    type: 'success',
    text: 'This feature coming soon.',
    showConfirmButton: false,
    timer: 2000
  })
  }
  
  clear(){
    this.guestdetail.msg='';
      
}




}

