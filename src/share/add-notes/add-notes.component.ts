import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { PostServicesService } from '../../services/post-services.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  addnotes = {
    notes_description: '',
    created_by: ''
  }

  isloggedInUser: any;

  MailInfo = {
    userEmail: '',
    suggestion: ''
  }

  isDisabled: boolean = false;

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



  constructor(private router: Router, private auth: LoginService, private postService: PostServicesService) { }

  ngOnInit() {
    this.isloggedInUser = JSON.parse(sessionStorage.getItem('LoginStatus'));
    console.log('thi si ', this.isloggedInUser.registrationid);
    this.addnotes.created_by = this.isloggedInUser.registrationid;
    this.MailInfo.userEmail = this.isloggedInUser.EmailID;



  }

  back() {

   // if (this.isloggedInUser.Role == 2) {
      this.router.navigate(['/user/welcome/display-notes']);
    // }
    // else if (this.isloggedInUser.Role == 3) {
    //   this.router.navigate(['/hod/welcome/display-notes']);
    // }

  }

  addNotes() {

    if (this.addnotes.notes_description == null || this.addnotes.notes_description == '' || this.addnotes.notes_description == undefined) {
      Swal.fire({
        type: 'error',
        text: 'Please Provide Suggestions',
        showConfirmButton: false,
        timer: 1000,
      })
    }
    else {
      this.MailInfo.suggestion = this.addnotes.notes_description;
      this.auth.addNotes(this.addnotes).subscribe(
        (data: any) => {
          if (data.status == true) {
            this.isDisabled = true;
            Swal.fire({
              type: 'success',
              text: 'Suggestions added successfully.',
              showConfirmButton: false,
              timer: 1000,
            })

            setTimeout(() => {
              this.router.navigate(['/user/welcome/display-notes']);
            }, 1500);


            this.addnotes = {
              notes_description: '',
              created_by: '1'
            }
            this.sendMail();
          }
          else {
          }

        });
    }

  }


  sendMail() {
    this.postService.sendMailForSuggestion(this.MailInfo).subscribe(
      (data: any) => {
        if (data.status == true) {
          //  Swal.fire('Notes added successfully.')

        }
        else {

        }


      });


  }

}
