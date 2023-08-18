import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { TrackingFileService } from 'src/app/services/tracking-file.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file-close',
  templateUrl: './file-close.component.html',
  styleUrls: ['./file-close.component.scss']
})
export class FileCloseComponent implements OnInit {
  Userdata: any;
  DepartmentId: any;
  RegistrationId: any;
  fileID: any;
  ProfileDetails = [];
  FileNameDetails = [];
  validatingForm: FormGroup;


  fileclose = {
    file_id: '',
    filename: '',
    status: 'close',
    filepath: '',
    remarks: ''

  }

  filework = {
    filename: '',
    file_id: '',
    file_notes: '',
    worked_by: '',
    assigned_by: '',
    courier_boy_name: '',
    assigned_by_department: '',
    add_attachment: 'No'
  }
  attachedFile = {
    assignedFileRowId: '',
    fileId: '',
    attachedFilePath: ''
  }
  totalfiles: any;
  showLoader: boolean = false;
  attachment_file: any;
  attachment_hide: boolean = true;
  emp_detail = [];
  sendmailToData = [];
  departmentdetail = [];
  sendmailToNameData= [];

  sendmailData = {
    file_id: '',
    filename: '',
    sendmail_from_email: '',
    sendmail_to_email: [],
  }
  fileName : any;
  
  constructor(private router: Router, private trackingfile: TrackingFileService, private activatedRoute: ActivatedRoute, private postservice: PostServicesService, private getservice: GetServicesService, private ele: ElementRef) { }

  ngOnInit() {
    this.showLoader = true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.RegistrationId = this.Userdata.registrationid;

    this.activatedRoute.queryParams.subscribe(params => {

      this.fileclose.file_id = params['file_id'];
      this.fileclose.filename = params['filename'];
      this.attachedFile.fileId = params['file_id'];

      this.sendmailData.file_id = params['file_id'];
      this.sendmailData.filename = params['filename'];

      this.fileName = this.fileclose.filename ;
      
      
    });


    this.sendmailToNameData= [];
    this.validation();
    this.getProfileDetails(this.RegistrationId);
    this.GetEmployeeProfileData();
    this.GetDepartment();
  }

  validation() {
    this.validatingForm = new FormGroup({
      //file_id: new FormControl(null, Validators.required),
      filename: new FormControl(),
      file_id: new FormControl(),
      filepath: new FormControl(),
      remarks: new FormControl(),
      SendTo: new FormControl(),
    });
  }

  getProfileDetails(RegistrationId) {

    this.trackingfile.getProfileDetails(RegistrationId).subscribe(res => {
      this.ProfileDetails = res;
      this.DepartmentId = this.ProfileDetails[0].department;

      this.sendmailData.sendmail_from_email = this.ProfileDetails[0].email_id;
      //this.getFileName(RegistrationId);
      this.showLoader = false;
    });
  }

  // getFileName(RegistrationId) {
  //   this.trackingfile.getFileName(RegistrationId).subscribe(res => {
  //     if (res.result.length == 0) {
  //       this.FileNameDetails = [];
  //       var obj = {
  //         file_id: 0,
  //         filename: '--Please Select File Name--',
  //       }
  //       this.FileNameDetails.splice(0, 0, obj);
  //       this.showLoader = false;
  //     }
  //     else {
  //       this.FileNameDetails = res.result;
  //       var obj = {
  //         file_id: 0,
  //         filename: '--Please Select File Name--',
  //       }
  //       this.FileNameDetails.splice(0, 0, obj);
  //       this.fileclose.file_id = this.FileNameDetails[0].file_id;
  //       this.fileclose.filename = this.FileNameDetails[0].filename;
  //       this.attachedFile.fileId = this.FileNameDetails[0].file_id;
  //       this.showLoader = false;
  //     }


  //   });
  // }

  // selectchangeforfile(args) {
  //   this.fileclose.file_id = this.FileNameDetails[args.target.selectedIndex].file_id;
  //   this.fileclose.filename = this.FileNameDetails[args.target.selectedIndex].filename;
  //   this.attachedFile.fileId = this.FileNameDetails[args.target.selectedIndex].file_id;
  // }


  onSelectFile(event) {

    this.totalfiles = [];
    //if (event.target.files && event.target.files[0]) {

    if (event.target.files.length > 0) {

      //var selectedFiles = event.target.files;
      //let file = selectedFiles;
      var selectedFiles = this.ele.nativeElement.querySelector('#attachment').files;

      for (var i = 0; i < selectedFiles.length; i++) {
        var extension = selectedFiles[i].name.split('.').pop(); //get file extension
        const name = Math.random().toString(36).substring(7) + '_' + new Date().getTime() + '_.' + selectedFiles[i].name;
        this.totalfiles[i] = (new File([selectedFiles[i]], name, { type: selectedFiles[i].type }));
        //this.totalfiles[i] = (new File([file], name, { type: file[i].type }));

      }
      this.filework.add_attachment = 'Yes';
      console.log('aaaaaaaa', this.totalfiles)
    }
    else {
      this.filework.add_attachment = 'No';
    }


    // if (event.target.files.length > 0) {
    //   var selectedFiles = event.target.files;
    //   //var extension = selectedFiles[0].name.split('.').pop(); //get file extension
    //   const name = Math.random().toString(36).substring(7) + '_' + new Date().getTime() + '_.' + selectedFiles[0].name;
    //   this.totalfiles = (new File([selectedFiles[0]], name, { type: selectedFiles[0].type }));

    //   this.filework.add_attachment = 'Yes';
    //   console.log('aaaaaaaa', this.totalfiles)
    // }
    // else {
    //   this.filework.add_attachment = 'No';
    // }
  }

  selectchangeforaddattachment(args) {
    this.attachment_file = args;
    if (this.attachment_file == 'Yes') {
      this.attachment_hide = false;
      this.filework.add_attachment = 'Yes';
    }
    else {
      this.attachment_hide = true;
      this.filework.add_attachment = 'No';
      var rd = document.getElementById('rdbtnno') as HTMLInputElement;
      rd.checked = true;
    }
  }


  GetEmployeeProfileData() {
    this.getservice.GetAllEmployeeProfileData_WithDeptName().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.emp_detail = data.result;
        }
        else {
          this.emp_detail = [];
        }
      });
  }

  GetDepartment() {
    this.getservice.GetAllDepartment().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.departmentdetail = data.result;
        }
        else {
          this.departmentdetail = [];
        }
      });
  }

  onChange(email_id,isChecked: boolean, firstname ) {
    if (isChecked) {
      this.sendmailToData.push(email_id);
      this.sendmailToNameData.push(firstname);
    } else {
      for (var i = 0; i < this.sendmailToData.length; i++) {
        if (this.sendmailToData[i] === email_id) {
          this.sendmailToData.splice(i, 1);
          this.sendmailToNameData.splice(i, 1);
          i--;
        }
      }
    }
    console.log("sendmailToData", this.sendmailToData)
    console.log("sendmailToNameData", this.sendmailToNameData)
  }


  async btn_fileclose() {


    // if (this.validatingForm.invalid) {
    //   //this.validatingForm.controls['filepath'].markAsTouched(),
    //   this.validatingForm.controls['file_id'].markAsTouched()
    // }
    // else if (this.fileclose.file_id == '0') {
    //   Swal.fire({
    //     type: 'error',
    //     text: 'Please Select File Name.',
    //     timer: 2000
    //   })
    // }
    // else {

    //this.fileclose.remarks = 'File Remarks - ' + this.fileclose.remarks;
    var closefile = await this.postservice.CloseFile(this.fileclose);

    if (closefile.status == true) {
      this.filework.filename = this.fileclose.filename;
      this.filework.file_id = closefile.result[0].file_id;
      this.filework.file_notes = this.fileclose.remarks;
      this.filework.assigned_by = this.RegistrationId;
      this.filework.assigned_by_department = this.DepartmentId;

      var filework = await this.postservice.AssignedFile_ForClosed(this.filework);

      if (filework.status == true) {

        this.attachedFile.assignedFileRowId = filework.result[0].id;

        if (this.filework.add_attachment == "Yes") {
          // const formData: any = new FormData();
          // const files = this.totalfiles;
          // formData.append('file', files);

          const formData: any = new FormData();
          const files = this.totalfiles;
          console.log('yesssssssss - Total Files', files);

          for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i]);
          }

          // this.postservice.fileupload_forclosingfile(formData).subscribe(
          //   data => {
          //     this.postservice.insertAttachedFile(this.totalfiles.name, this.attachedFile).subscribe(res => {
          //     });
          //     this.ele.nativeElement.querySelector('#attachment').value = '';
          //   },
          //   error => console.log('Error')
          // );

          this.postservice.fileupload(this.filework.file_id, formData).subscribe(
            data => {

              console.log('yesssssssss - Data', data);

              for (var i = 0; i < this.totalfiles.length; i++) {
                this.postservice.insertAttachedFile(this.totalfiles[i].name, this.attachedFile).subscribe(res => {

                });
              }
            },
            error => console.log('Error')
          );
        }

        this.validatingForm.reset();
        Swal.fire({
          type: 'success',
          text: 'File closed successfully.',
          showConfirmButton: false,
          timer: 2000
        });

        // this.getProfileDetails(this.RegistrationId);
        // this.selectchangeforaddattachment('No');

        if (this.sendmailToData.length > 0) {

          this.sendmailData.sendmail_to_email = this.sendmailToData;

          this.postservice.InsertSendMailForFileClose(this.sendmailData).subscribe(data => {
            if (data.success == true) {

              

              this.postservice.SendMailForFileClose(this.sendmailToData, this.sendmailData.file_id).subscribe(data => {
                if (data.success == true) {

                }
              });

              setTimeout(() => {
                this.router.navigate(['/user/welcome/file-on-my-desk']);
                this.showLoader = false;
              }, 2500);

            }
          });

        }
        else{
          setTimeout(() => {
            this.router.navigate(['/user/welcome/file-on-my-desk']);
            this.showLoader = false;
          }, 2200);
        }

       


      }
    }
    //}
  }


}

