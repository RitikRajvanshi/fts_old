import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2'
import { async } from '@angular/core/testing';

declare const $;

@Component({
  selector: 'app-file-receive',
  templateUrl: './file-receive.component.html',
  styleUrls: ['./file-receive.component.scss']
})
export class FileReceiveComponent implements OnInit {
  Userdata: any;
  totalfiles: any;
  profiledetail: any;
  allUsers: any;
  transferedByUserFullName: any;
  totalfilesOnMyDepartment: any;
  showLoader:boolean=false;
  showLoader1:boolean=false;
  objectTobeSent_forFilerecieve = {
    serialIdOfRowTobeUpdated: '',
    assigned_to_userid: '',
    received_by_userid: '',
    received_by_username: '',
    assigned_to_username: ''
  };
  file_name:any;
  file_subject:any;

  popupDetail={
    filename:'',
    createddate:'',
    createdby:'',
    departmentname:'',
    filecategory:'',
    status:'',
    subject:'',
    priority:'',
  }

  ReceiverMailData={
    filename:'',
    receiver_departmentname:'',
    receivername:'',
  }

  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.getUserProfile();
  }


  Recive() {
    Swal.fire({
      type: 'success',
      text: 'As Soon as you received selected file, <br/>This file will go in "Files on my desk" Menu .',
      showConfirmButton: false,
      timer: 2000
    })

  }

  GetFilesToBeReceived() {
    this.getservice.getFileToBeReceivedByDepartmentId_ForfileReceived(this.Userdata.registrationid).subscribe(async res => {

      this.totalfiles = res.result;

      $('#TblDatatable').dataTable().fnDestroy();
      this.dataTable();
      this.showLoader=false;

      this.getservice.postLatestCountOfFileReceived(this.totalfiles.length);

      // for (let i = 0; i < this.totalfiles.length; i++) {

      //   var response = await this.getservice.getUserNameByUserId(this.totalfiles[i].assigned_by);
      //   var assigned_by_username = response[0].first_name + ' ' + response[0].last_name;
      //   this.totalfiles[i].assigned_by_username = assigned_by_username;

      // }


    },
      error => alert(error),
      () => console.log('Finished')
    );

  }

  popup_filedata(filename, subject) {
    this.file_name = filename;
    this.file_subject = subject;
  }

  getfilecreationInfo(fileid) {

    this.getservice.getfilecreationInfo(fileid).subscribe(res => {
      this.popupDetail.filename = res.result[0].filename;
      this.popupDetail.filecategory = res.result[0].category_name;
      this.popupDetail.subject = res.result[0].subject;
      this.popupDetail.priority = res.result[0].priority;
      this.popupDetail.status = res.result[0].status;
      this.popupDetail.departmentname=res.result[0].departmentname;
      this.popupDetail.createddate=res.result[0].createddate;
      this.popupDetail.createdby=res.result[0].filecreatedby;


 
    });
   
  }

  getUserProfile() {
    this.getservice.GetProfileData_FileReceived(this.Userdata.registrationid).subscribe(res => {
      this.profiledetail = res;
      this.GetFilesToBeReceived();
    });
  }


  async assignToUser(serialid, alldata) {
    this.showLoader1=true;
    this.objectTobeSent_forFilerecieve.serialIdOfRowTobeUpdated = serialid;
    this.objectTobeSent_forFilerecieve.received_by_userid = this.Userdata.registrationid;

    this.ReceiverMailData.receiver_departmentname=this.profiledetail[0].departmentname;

    if (this.profiledetail[0].last_name == null || this.profiledetail[0].last_name == '') {
      this.objectTobeSent_forFilerecieve.received_by_username = this.profiledetail[0].first_name;
      this.ReceiverMailData.receivername=this.objectTobeSent_forFilerecieve.received_by_username;
    }
    else {
      this.objectTobeSent_forFilerecieve.received_by_username = this.profiledetail[0].first_name +' '+ this.profiledetail[0].last_name;
      this.ReceiverMailData.receivername=this.objectTobeSent_forFilerecieve.received_by_username;
    }

    this.ReceiverMailData.filename = alldata.filename;
    var receivefile = await this.postservice.receivefile(this.objectTobeSent_forFilerecieve);

    if (receivefile.status == true) {
      

      this.SendMail_forReceiver(alldata);
      this.SendMail_forSender(this.ReceiverMailData, alldata.senderemailid);
      this.GetFilesToBeReceived();
      this.UpdateLatestFileCountOnMyDepartment();

      Swal.fire({
        type: 'success',
        text: 'Received.',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        this.showLoader1=false;
      }, 2100);
   }
   else
   {
    setTimeout(() => {
      this.showLoader1=false;
    }, 2100);
   }
  }

  UpdateLatestFileCountOnMyDepartment() {
    this.getservice.GetFileByDepartmentIdAndRegistrationId(this.profiledetail[0].department,this.profiledetail[0].registration_id).subscribe(res => {
      this.totalfilesOnMyDepartment = res.result;
      this.getservice.postLatestCountOfFiles(this.totalfilesOnMyDepartment.length);
    },
      error => alert(error),
      () => console.log('Finished')
    );
  }

  SendMail_forReceiver(alldata) {
    this.postservice.sendFileMail_forReceiver(alldata, this.Userdata.EmailID).subscribe(data => {
      if (data.success == true) {

      }
    });
  }

  SendMail_forSender(receiverdata, senderemailid) {
    this.postservice.sendFilemail_forSender(receiverdata, senderemailid).subscribe(data => {
      if (data.success == true) {

      }
    });
  }

  dataTable() {

    $(function () {

      var table = $('#TblDatatable').DataTable(
        {
         
        paging:false,
         dom: "<'row'<'col-sm-4 text-left'B><'col-sm-8'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-6'i><'col-sm-6'p>>",
          columnDefs: [{
            "targets": [6],
            "searchable": false,
            "orderable": false
          }], 
          buttons: [
            {
              extend: 'excel',
              text: 'Export To Excel',
              exportOptions: {
                //columns: ':visible'
                columns: [0, 1,2,3,4,5]
              }
            },
          ]

        }
      );

      table.buttons().container()
        .appendTo('#Datatable_Master .col-md-6:eq(0)');

    });
  }

}
