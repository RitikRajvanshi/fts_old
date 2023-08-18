import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { GetServicesService } from 'src/app/services/get-services.service';
import * as myGlobals from '../../globalvar';
import { PostServicesService } from 'src/app/services/post-services.service';


@Component({
  selector: 'app-broadcast-message',
  templateUrl: './broadcast-message.component.html',
  styleUrls: ['./broadcast-message.component.scss']
})
export class BroadcastMessageComponent implements OnInit {


  Userdata: any;
  departmentdetail: any;
  datavalue = [];
  emails = [];
  department_id: any;

  broadcastdetail = {

    msg: '',
    departmentID: '',
    message_send_by:''
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
this.broadcastdetail.message_send_by=this.Userdata.registrationid;
  //this.assignedFileData.assigned_by = this.Userdata.registrationid;
    // this.validation();
    this.GetDepartment();

  }


  GetDepartment() {
    this.getservice.getAllDepartment_ForManageFileHolidays().subscribe(
      (data: any) => {
        this.departmentdetail = data.result;
        var obj = {
          id: 0,
          departmentname: '--Please Select Department Name--',
        }
        this.departmentdetail.splice(0, 0, obj);
        this.department_id = this.departmentdetail[0].id;
        this.broadcastdetail.departmentID = this.departmentdetail[0].id;
        this.GetAllEmails(this.departmentdetail[0].id);
      }

    )

  }

  selectchangefordepartment(args) {
    this.broadcastdetail.departmentID = this.departmentdetail[args.target.selectedIndex].id;
    //this.getFileTrackingData(this.fileID);
    this.GetAllEmails(this.broadcastdetail.departmentID);
  }


  GetAllEmails(departmentID) {
    this.emails = [];
    this.getservice.GetAllUserByDepartment(departmentID).subscribe(
      data => {
        if (data.status == true) {

          for (var i = 0; i < data.result.length; i++) {


            this.emails.push(data.result[i].email_id);

          }

          console.log(this.emails)

        }


      },
      error => console.log('Error has occured.')
    );
  }


  submit() {

      if ( this.broadcastdetail.departmentID == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Department Name.',
        timer: 2000
      })
    }
    else {
      this.postService.SendMailToAllDepartmentUser(this.emails, this.broadcastdetail.msg).subscribe(data => {
        if (data.success == true) {
          this.storeMessageInformation();
          
        }
  
      });
    }

    
  }

  storeMessageInformation(){
    this.postService.storeMessageInformation(this.broadcastdetail).subscribe(data => {
      if (data.status == true) {
        Swal.fire({
          type: 'success',
          text: 'Message Brodcast.',
          showConfirmButton: false,
          timer: 2000
        })
        this.clear();
      }

    });


  }


  // submit() {

  //   console.log('all emails',this.emails);
  //   console.log('broadcast message',this.broadcastdetail.msg);

  //   Swal.fire({
  //     type: 'success',
  //     text: 'This feature coming soon.',
  //     showConfirmButton: false,
  //     timer: 2000
  //   })

  //   //if (this.department_id == '0') {
  //   //   Swal.fire({
  //   //     type: 'error',
  //   //     text: 'Please Select Department Name.',
  //   //     timer: 2000
  //   //   })
  //   // }
  //   // else {
  //   // this.SendAllMail();
  //   //}
  // }

  clear() {
    this.broadcastdetail.msg = '';

  }



}
