import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { TrackingFileService } from 'src/app/services/tracking-file.service';
import { PostServicesService } from 'src/app/services/post-services.service';

@Component({
  selector: 'app-reopen-closed',
  templateUrl: './reopen-closed.component.html',
  styleUrls: ['./reopen-closed.component.scss']
})
export class ReopenClosedComponent implements OnInit {

  Userdata: any;
  DepartmentId: any;
  RegistrationId: any;
  fileID: any;
  ProfileDetails = [];
  FileNameDetails = [];
  validatingForm: FormGroup;

  filereopen = {
    file_id: '',
    filename: '',
    status: 'open'
  }

  assignfile = {
    filename: '',
    file_id: '',
    assigned_to: '',
    assigned_by: '',
    received_date: 'null',
    assigned_to_userid: '',
    remarks:''
  }

  constructor(private trackingfile: TrackingFileService, private postservice: PostServicesService) { }

  ngOnInit() {
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.RegistrationId = this.Userdata.registrationid;
    this.validation();
    this.getProfileDetails(this.RegistrationId);
  }

  validation() {
    this.validatingForm = new FormGroup({
      file_id: new FormControl(null, Validators.required),
      file_remarks: new FormControl(null, Validators.required)
    });
  }

  getProfileDetails(RegistrationId) {
    this.trackingfile.getProfileDetails(RegistrationId).subscribe(res => {
      this.ProfileDetails = res;
      this.DepartmentId = this.ProfileDetails[0].department;
      this.getFileName(this.DepartmentId);
    });
  }

  getFileName(DepartmentId) {
    this.trackingfile.getAllCloseFile(DepartmentId).subscribe(res => {
      if (res.result.length == 0) {
        this.FileNameDetails = [];
        var obj = {
          file_id: 0,
          filename: '--Please Select File Name--',
        }
        this.FileNameDetails.splice(0, 0, obj);
      }
      else {
        this.FileNameDetails = res.result;
        var obj = {
          file_id: 0,
          filename: '--Please Select File Name--',
        }
        this.FileNameDetails.splice(0, 0, obj);
        this.filereopen.file_id = this.FileNameDetails[0].file_id;
        this.filereopen.filename = this.FileNameDetails[0].filename;
      }

    });
  }

  selectchangeforfile(args) {
    this.filereopen.file_id = this.FileNameDetails[args.target.selectedIndex].file_id;
    this.filereopen.filename = this.FileNameDetails[args.target.selectedIndex].filename;
  }


  async btn_filereopen() {

    // Swal.fire({
    //   type: 'success',
    //   text: 'This feature coming soon.',
    //   showConfirmButton: false,
    //   timer: 2000
    // })
    
    if (this.filereopen.file_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select File Name.',
        timer: 2000
      })
    }
    else if (this.validatingForm.invalid) {
      this.validatingForm.controls['file_id'].markAsTouched();
      this.validatingForm.controls['file_remarks'].markAsTouched()
    }
    else {

      var reopenfile = await this.postservice.ReopenFile(this.filereopen);

      if (reopenfile.status == true) {
        this.assignfile.filename = this.filereopen.filename;
        this.assignfile.file_id = reopenfile.result[0].file_id;
        this.assignfile.assigned_by = this.RegistrationId;
        this.assignfile.assigned_to = this.DepartmentId;
        this.assignfile.assigned_to_userid =this.RegistrationId;

        var fileassign = await this.postservice.assignFile_forReopenFile(this.assignfile);

        if (fileassign.status == true) {

          this.validatingForm.reset();
          Swal.fire({
            type: 'success',
            text: 'File re-opened successfully.',
            showConfirmButton: false,
            timer: 2000
          });

          this.getProfileDetails(this.RegistrationId);

        }
      }
    }
  }

}
