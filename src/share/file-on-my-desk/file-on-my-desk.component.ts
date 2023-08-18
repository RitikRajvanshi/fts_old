import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import Swal from 'sweetalert2';
import { PostServicesService } from 'src/app/services/post-services.service';

declare const $;

@Component({
  selector: 'app-file-on-my-desk',
  templateUrl: './file-on-my-desk.component.html',
  styleUrls: ['./file-on-my-desk.component.scss']
})
export class FileOnMyDeskComponent implements OnInit {
  Userdata: any;
  totalfiles: any;
  profiledetail: any;
  p = 1;
  editfile = {
    filename: '',
    file_id: '',
    file_notes: '',
    worked_by: '',
    returned_fileid: '',
    department_name: '',
    worked_by_username: '',
    department_id: ''
  }

  popupDetail = {
    filename: '',
    createddate: '',
    createdby: '',
    departmentname: '',
    filecategory: '',
    status: '',
    subject: '',
    priority: '',
  }
  showLoader: boolean = false;

  revertFileData = {
    id: '',
    filename: '',
    file_id: '',
    assigned_to_departmentId: '',
    assigned_by: '',
    courier_boy_name: '',
    assigned_by_department: '',
    remarks: 'File Revert.',
    assigned_to_username: '',
    assigned_to_userid: '',
    department_head: '',
    department_headId: '',
    assigned_to_DepartmentName: '',
    assigned_to_useremail: ''

  }
  hiddenFileCloseColumn: boolean = true;
  totalfiles_upperfileholdingdays = [];
  results = [];
  constructor(private router: Router, private getservice: GetServicesService, private postservice: PostServicesService) { }

  ngOnInit() {
    this.showLoader = true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.editfile.worked_by = this.Userdata.registrationid;
    this.getUserProfile();
  }


  async editFile(file_id, id, filename) {

    this.editfile.file_id = file_id;
    this.router.navigate(['/user/welcome/file-move'], { queryParams: { file_id: file_id, id: id, filename: filename } });
    sessionStorage.removeItem('FileNoting');
    sessionStorage.setItem('FileNoting', JSON.stringify(this.editfile));

  }

  async FileClosed(file_id, filename) {

    this.router.navigate(['/user/welcome/file-close'], { queryParams: { file_id: file_id, filename: filename } });


  }





  getUserProfile() {
    this.getservice.GetProfileData_FileOnMyDesk(this.Userdata.registrationid).subscribe(res => {
      this.profiledetail = res;

      if (this.profiledetail[0].role == '4' || this.profiledetail[0].role == '5' || this.profiledetail[0].role == '6' || this.profiledetail[0].role == '7') {
        this.hiddenFileCloseColumn = false;
      }
      else {
        this.hiddenFileCloseColumn = true;
      }


      this.editfile.department_name = this.profiledetail[0].departmentname;
      this.editfile.department_id = this.profiledetail[0].department;

      this.revertFileData.assigned_by_department = this.profiledetail[0].department;
      this.revertFileData.assigned_by = this.profiledetail[0].registration_id;
      this.revertFileData.courier_boy_name = '';

      if (this.profiledetail[0].last_name == null || this.profiledetail[0].last_name == '') {
        this.editfile.worked_by_username = this.profiledetail[0].first_name;
      }
      else {
        this.editfile.worked_by_username = this.profiledetail[0].first_name + ' ' + this.profiledetail[0].last_name;
      }

      console.log('profile', this.profiledetail);
      this.Getfiles(this.profiledetail[0].department, this.profiledetail[0].registration_id);


    });
  }


  Getfiles(department, registration_id) {
    this.getservice.GetFileByDepartmentIdAndRegistrationId(department, registration_id).subscribe(res => {

      this.totalfiles = res.result;

      this.getservice.postLatestCountOfFiles(this.totalfiles.length);
      this.gettotalfiles_morethanholdingdays(registration_id, department);
      console.log('total files', this.totalfiles);
      // $('#TblDatatable').dataTable().fnDestroy();
      // this.dataTable();

    },
      error => alert(error),
      () => console.log('Finished')
    );

  }

  gettotalfiles_morethanholdingdays(registrationid: any, department: any) {
    this.results = [];
    this.getservice.gettotalfiles_morethanholdingdays(registrationid, department).subscribe(res => {
      // if (res.result.length > 0) {

      this.totalfiles_upperfileholdingdays = res.result;

      this.results = this.totalfiles.map(totalfiles => {
        const applyStatus = this.totalfiles_upperfileholdingdays.find(status => status.file_id === totalfiles.file_id);
        return {
          ...totalfiles, status: applyStatus ? applyStatus.extradays : undefined
        };
      });
      console.log('totalfiles_upperfileholdingdays', this.results);
      $('#TblDatatable').dataTable().fnDestroy();
      this.dataTable();

      // }
      
      this.showLoader = false;
    })
  }

  async revertFile(fileData) {

    this.revertFileData.id = fileData.id;
    this.revertFileData.file_id = fileData.file_id;
    this.revertFileData.filename = fileData.filename;
    this.revertFileData.assigned_to_userid = fileData.assigned_by;
    this.revertFileData.assigned_to_departmentId = fileData.assigned_by_department;

    var updateWorkAssign = await this.postservice.update_WorkAssign(this.revertFileData);
    if (updateWorkAssign.status == true) {
      var fileassign = await this.postservice.moveFile(this.revertFileData);
      if (fileassign.status == true) {

        Swal.fire({
          type: 'success',
          text: 'File reverted successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        //this.Getfiles(this.revertFileData.assigned_by_department, this.revertFileData.assigned_by);
      }
    }
  }


  getfilecreationInfo(fileid) {

    this.getservice.getfilecreationInfo(fileid).subscribe(res => {
      this.popupDetail.filename = res.result[0].filename;
      this.popupDetail.filecategory = res.result[0].category_name;
      this.popupDetail.subject = res.result[0].subject;
      this.popupDetail.priority = res.result[0].priority;
      this.popupDetail.status = res.result[0].status;
      this.popupDetail.departmentname = res.result[0].departmentname;
      this.popupDetail.createddate = res.result[0].createddate;
      this.popupDetail.createdby = res.result[0].filecreatedby;



    });

  }


  dataTable() {


    $(function () {

      var table = $('#TblDatatable').DataTable(
        {
          destroy: true,
          paging: false,
          // searching: false,
          dom: "<'row'<'col-sm-4 text-left'B><'col-sm-8'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'i><'col-sm-6'p>>",
          columnDefs: [{
            "targets": [5, 6],
            "searchable": false,
            "orderable": false
          }],
          buttons: [
            {
              extend: 'excel',
              text: 'Export To Excel',
              exportOptions: {
                //columns: ':visible'
                columns: [0, 1, 2, 3, 4]
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
