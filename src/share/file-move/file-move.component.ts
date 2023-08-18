import { Component, OnInit, ElementRef } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import * as myGlobals from '../../globalvar';

@Component({
  selector: 'app-file-move',
  templateUrl: './file-move.component.html',
  styleUrls: ['./file-move.component.scss']
})

export class FileMoveComponent implements OnInit {

  Userdata: any;
  totalfilesOnMyDepartment: any;
  showLoader: boolean = false;

  fileMovement = {
    filename: '',
    file_id: '',
    department_id: '',
    departmentEmailId: '',
    assigned_to_userid: '',
    remarks: 'Remarks has been done on physical file.',
    courier_boy_name: 'Self',
    id: '',
    assigned_by: '',
    assigned_by_department: '',
    assigned_to_departmentId: '',
    add_attachment: 'No'

  }

  isDisabled: boolean = false;
  assignToUser = [];
  checkCount: any;
  countForFile: any;
  departmentInfo: any;
  userdetail: any;
  SelectedDepartmentHODRegistrationID: any;
  attachment_file: any;
  attachment_hide: boolean = true;
  public totalfiles: Array<File> = [];

  attachedFile = {
    assignedFileRowId: '',
    fileId: '',
    attachedFilePath: ''
  }
  ftpaddress = myGlobals.ftpaddress1;
  totalattachedfiles = [];


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private ele: ElementRef, private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.fileMovement.assigned_by = this.Userdata.registrationid;

    this.activatedRoute.queryParams.subscribe(params => {
      this.fileMovement.filename = params['filename'];
      this.fileMovement.file_id = params['file_id'];
      this.attachedFile.fileId = params['file_id'];
      this.fileMovement.id = params['id'];
      this.GetProfileDetail();
      this.getDepartmentOfLoginUserAsPerUserRole();
      //  this.getUserProfile();
    });

  }


  GetProfileDetail() {

    this.getservice.GetProfileData_userSidebar(this.Userdata.registrationid).subscribe(res => {
      this.userdetail = res;
      this.fileMovement.assigned_by_department = this.userdetail[0].department;
    });
  }

  getDepartmentOfLoginUserAsPerUserRole() {

    if (this.Userdata.Role == '2')//Staff
    {
      this.checkForMultiRows(this.fileMovement.file_id);
    }
    else if (this.Userdata.Role == '3')//HOD
    {
      // this.getservice.getAllDepartmentForHOD(this.Userdata.registrationid).subscribe(res => {

      //   this.departmentInfo = res.result;
      //   var obj1 = {
      //     department: '26',
      //     departmentname: 'Registrar Unit',
      //   }
      //   this.departmentInfo.splice(0, 0, obj1);

      // });
      this.getAllDepartmentByUserRoleAndRegistrationId(3, this.Userdata.registrationid);

    }
    else if (this.Userdata.Role == '4')//Department
    {
      this.getAllDepartmentByUserRoleAndRegistrationId(4, this.Userdata.registrationid);
    }
    else if (this.Userdata.Role == '5')//Department-Registrar
    {
      // this.getservice.getAllDepartmentNew().subscribe(res => {
      //   this.departmentInfo = res.result;

      // });
      this.getAllDepartmentByUserRoleAndRegistrationId(5, this.Userdata.registrationid);

    }
    else if (this.Userdata.Role == '6')//Department-Director Office
    {
      this.getAllDepartmentByUserRoleAndRegistrationId(6, this.Userdata.registrationid);
    }
    else if (this.Userdata.Role == '7')//Department-RDCC
    {
      this.getAllDepartmentByUserRoleAndRegistrationId(7, this.Userdata.registrationid);
    }

  }


  onChangedepartment(args) {
    this.fileMovement.department_id = this.departmentInfo[args.target.selectedIndex].department;
    this.fileMovement.assigned_to_departmentId = this.fileMovement.department_id;

    this.getservice.getDepartmentEmailId(this.fileMovement.department_id).subscribe(res => {
      this.fileMovement.departmentEmailId = res.result[0].email_id;



      if (this.Userdata.Role == '2') {
        this.getAssignedToUser5Else(this.Userdata.Role, this.fileMovement.department_id)
      }
      else if (this.Userdata.Role == '3') { // HOD case

        if (this.fileMovement.department_id == this.userdetail[0].department) { // Means selected dept and logged user depart. matched.  

          this.getservice.getDepartmentHOD_departmentIdBased(this.fileMovement.department_id).subscribe(res => {
            this.SelectedDepartmentHODRegistrationID = res.result[0].department_head;

            if (this.userdetail[0].registration_id == this.SelectedDepartmentHODRegistrationID)//to check Registrar HOD
            {
              this.getAssignedToUserAllEmployeesBasedOnRole(this.Userdata.Role, this.fileMovement.department_id)
            }
            else {
              this.getAssignedToUser5Else(this.Userdata.Role, this.fileMovement.department_id)
            }

          });

        }
        else { // Means selected dept and logged user depart. Not matched. so only department email id will come. 
          this.getAssignedToUser5Else(this.Userdata.Role, this.fileMovement.department_id)
        }
      }
      else if (this.Userdata.Role == '4') {
        if (this.fileMovement.department_id == this.userdetail[0].department) {
          this.getAssignedToUserAllEmployeesBasedOnRole(this.Userdata.Role, this.fileMovement.department_id);
        }
        else {
          if (this.fileMovement.departmentEmailId == this.userdetail[0].email_id) {
            this.getAssignedToUser4Else(this.fileMovement.department_id);
          }
          else {
            this.getAssignedToUser5Else(this.Userdata.Role, this.fileMovement.department_id);
          }
        }
      }
      else if (this.Userdata.Role == '5') {
        if (this.fileMovement.department_id == this.userdetail[0].department) {
          this.getAssignedToUserAllEmployeesBasedOnRole(this.Userdata.Role, this.fileMovement.department_id)
        }
        else {
          this.getAssignedToUser5Else(this.Userdata.Role, this.fileMovement.department_id)
        }
      }
      else if (this.Userdata.Role == '6') {
        if (this.fileMovement.department_id == this.userdetail[0].department) {
          this.getAssignedToUserAllEmployeesBasedOnRole(this.Userdata.Role, this.fileMovement.department_id)
        }
        else {
          this.getAssignedToUser5Else(this.Userdata.Role, this.fileMovement.department_id)
        }
      }
      else if (this.Userdata.Role == '7') {
        if (this.fileMovement.department_id == this.userdetail[0].department) {
          this.getAssignedToUserAllEmployeesBasedOnRole(this.Userdata.Role, this.fileMovement.department_id)
        }
        else {
          this.getAssignedToUser5Else(this.Userdata.Role, this.fileMovement.department_id)
        }
      }

    });


  }

  changeForAssignToUser(args) {
    this.fileMovement.assigned_to_userid = this.assignToUser[args.target.selectedIndex].registration_id;
  }

  checkForMultiRows(fileid) {
    this.getservice.GetFileIdBased_Department(fileid).subscribe(res => {
      this.checkCount = res.result;
      if (res.result[0].count == 1) {
        this.getservice.registrarDepartment().subscribe(res => {
          this.departmentInfo = res.result;

        });

      }
      else {
        this.getAllDepartmentByUserRoleAndRegistrationId(2, this.Userdata.registrationid);
      }

    });
  }

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

      console.log('aaaaaaaa', this.totalfiles)
    }
    //}
  }


  async assigneFile() {
    this.showLoader = true;

    if (this.fileMovement.assigned_to_departmentId == "" || this.fileMovement.assigned_to_departmentId == undefined || this.fileMovement.assigned_to_departmentId == null) {
      Swal.fire({
        type: 'error',
        text: 'Please Select Department',
        timer: 2000
      })
      this.showLoader = false;
    }
    else if (this.fileMovement.assigned_to_userid == "" || this.fileMovement.assigned_to_userid == null || this.fileMovement.assigned_to_userid == undefined) {
      Swal.fire({
        type: 'error',
        text: 'Please Select User Name',
        timer: 2000
      })
      this.showLoader = false;
    }
    else {

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var curentdate = yyyy + '-' + mm + '-' + dd;
      var leaveCheck = await this.getservice.checkForLeave(curentdate, this.fileMovement.assigned_to_userid);
      if (leaveCheck.result.length > 0) {
        Swal.fire({
          type: 'error',
          title: "Can't forward.",
          text: "User is on Leave",

        })
        this.showLoader = false;
      }
      else {

        this.isDisabled = true;
        var updateWorkAssign = await this.postservice.update_WorkAssign(this.fileMovement);
        if (updateWorkAssign.status == true) {
          var fileassign = await this.postservice.moveFile(this.fileMovement);
          if (fileassign.status == true) {

            this.attachedFile.assignedFileRowId = fileassign.result[0].id;

            if (this.fileMovement.add_attachment == 'Yes') {

              const formData: any = new FormData();
              //const files: Array<File> = this.totalfiles;
              const files = this.totalfiles;
              console.log('yesssssssss - Total Files', files);

              for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i]);
              }
              console.log('form data variable :   ' + formData.toString());
              this.postservice.fileupload(this.fileMovement.file_id, formData).subscribe(
                data => {

                  console.log('yesssssssss - Data', data);
                  // if(data.status == true)
                  // {
                  for (var i = 0; i < this.totalfiles.length; i++) {
                    this.postservice.insertAttachedFile(this.totalfiles[i].name, this.attachedFile).subscribe(res => {

                    });
                  }
                  // }

                },
                error => console.log('Error')
              );


            }

            Swal.fire({
              type: 'success',
              text: 'File moved successfully.',
              showConfirmButton: false,
              timer: 1800
            })
            this.UpdateLatestFileCountOnMyDepartment();


            setTimeout(() => {
              this.router.navigate(['/user/welcome/file-on-my-desk']);
              this.showLoader = false;
            }, 2100);

          }
        }
      }
    }

  }


  getAllDepartmentByUserRoleAndRegistrationId(role, registration_id) {

    this.getservice.getAllDepartmentByUserRoleAndRegistrationId(role, registration_id).subscribe(res => {
      this.departmentInfo = res.result;
    });
  }

  getAssignedToUserAllEmployeesBasedOnRole(role, departmentId) {

    this.getservice.getAssignedToUserAllEmployeesBasedOnRole(role, departmentId).subscribe(res => {
      this.assignToUser = res.result;
    });
  }

  getAssignedToUser5Else(role, departmentId) {

    this.getservice.getAssignedToUser5Else(role, departmentId).subscribe(res => {
      this.assignToUser = res.result;
    });
  }

  getAssignedToUser4Else(departmentId) {

    this.getservice.getAssignedToUser4Else(departmentId).subscribe(res => {
      this.assignToUser = res.result;
    });
  }


  UpdateLatestFileCountOnMyDepartment() {
    this.getservice.GetFileByDepartmentIdAndRegistrationId(this.userdetail[0].department, this.userdetail[0].registration_id).subscribe(res => {
      this.totalfilesOnMyDepartment = res.result;
      this.getservice.postLatestCountOfFiles(this.totalfilesOnMyDepartment.length);
    },
      error => alert(error),
      () => console.log('Finished')
    );
  }

  selectchangeforaddattachment(args) {
    this.attachment_file = args;
    if (this.attachment_file == 'Yes') {
      this.attachment_hide = false;
      this.fileMovement.add_attachment = 'Yes';
    }
    else {
      this.attachment_hide = true;
      this.fileMovement.add_attachment = 'No';
    }
  }


}
