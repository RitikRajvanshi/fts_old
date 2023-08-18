import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
declare const $;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.scss']
})
export class AddAttachmentComponent implements OnInit {

  constructor( private getservice: GetServicesService, private postservice: PostServicesService) { }

  Userdata: any;
  RegistrationId: any;
  fileID: any;
  fileName: any;
  FileNameDetails = [];
  FileTrackingData = [];

  TotalFilesCount:any;
  showLoader: boolean = false;
  fileSubject:any;

  ngOnInit() {
    this.showLoader = true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.RegistrationId = this.Userdata.registrationid;
    this.getFileId(this.RegistrationId);
  }
 
  getFileId(RegistrationId) {
    this.getservice.getAllFileId_foraddAttachment(RegistrationId).subscribe(res => {
      if(res.result.length >0){
        this.FileNameDetails = res.result;
        this.fileID = this.FileNameDetails[0].file_id;
        this.fileName = this.FileNameDetails[0].filename;
        this.fileSubject = this.FileNameDetails[0].subject;
      }
      
      this.showLoader = false;
    });
  }

  selectchangeforfile(args) {
    this.fileID = this.FileNameDetails[args.target.selectedIndex].file_id;
    this.fileName = this.FileNameDetails[args.target.selectedIndex].filename;
    this.fileSubject = this.FileNameDetails[args.target.selectedIndex].subject;
  }

}
