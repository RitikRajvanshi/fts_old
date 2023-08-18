import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';

declare const $;

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  Userdata: any;
  departmentdetail = [];
  departmentUserDetail = [];
  userdetail = [];
  department = {
    departmentname: '',
    departmenthead: '',
    departmentshortname: '',
    createdby: '',
    registration_id: '',
    newdepartmentname: '',
    departmentid: '',
    emailId: '',
    newEmailId: '',
    emailIdTobeUpdated: '',
    departmentDesignation: ''

  }
  validatingForm: any;
  departmentDetail_byId = [];
  showLoader: boolean = false;
  allDesignations: any;

  constructor(private router: Router, private getservice: GetServicesService, private postservice: PostServicesService) { }

  ngOnInit() {
    this.showLoader = true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.GetProfileDetail(this.Userdata.registrationid);
    this.GetEmployeeProfileData();
    this.GetDepartment();
    this.getAllDesignations();
    this.validation();

  }

  validation() {

    this.validatingForm = new FormGroup({

      departmentname: new FormControl(null, Validators.required),
      // departmentshortname: new FormControl(null, Validators.required),
      newdepartmentname: new FormControl(null, Validators.required),
      emailid: new FormControl(null, Validators.required),
      newemailid: new FormControl(null, Validators.required),

    });
  }


  GetProfileDetail(registrationid) {

    this.getservice.GetProfileData_AddDepartment(registrationid).subscribe(res => {
      this.userdetail = res;
      if (this.userdetail[0].last_name == null || this.userdetail[0].last_name == '') {
        this.department.createdby = this.userdetail[0].first_name;
      }
      else {
        this.department.createdby = this.userdetail[0].first_name + ' ' + this.userdetail[0].last_name;
      }

    },
      error => alert(error),
      () => console.log('Finished')
    );

  }

  GetDepartment() {
    this.getservice.GetAllDepartment_forAddDepartment().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.departmentdetail = data.result;
          $('#dept_details').dataTable().fnDestroy();
          this.dataTable();
          this.showLoader = false;
        }
        else {
          this.showLoader = false;
          this.departmentdetail = [];
        }
      });
  }


  GetEmployeeProfileData() {
    this.getservice.GetAllEmployeeProfileData().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.departmentUserDetail = data.result;
          this.department.registration_id = this.departmentUserDetail[0].registration_id;
          this.department.departmenthead = this.departmentUserDetail[0].first_name + this.departmentUserDetail[0].last_name;
        }
        else {
          this.departmentUserDetail = [];
        }
      });
  }



  changeDepartmentHead(args) {
    this.department.registration_id = this.departmentUserDetail[args.target.selectedIndex].registration_id;
    this.department.departmenthead = this.departmentUserDetail[args.target.selectedIndex].first_name + this.departmentUserDetail[args.target.selectedIndex].last_name;
  }

  UpdateDepartment() {

    if (this.validatingForm.invalid) {
      this.validatingForm.controls['newdepartmentname'].markAsTouched();

      //this.validatingForm.controls['departmentshortname'].markAsTouched();
    }
    else {

      this.postservice.updateDepartment(this.department).subscribe(
        async (data: any) => {
          if (data.result == '1') {

            Swal.fire({
              type: 'success',
              text: 'Department name Updated successfully.',
              showConfirmButton: false,
              timer: 2000,
            });

            $("#myModal").modal("hide");
            this.GetDepartment();
            this.clear();



          }
          else if (data.result == '3') {
            Swal.fire({
              type: 'error',
              text: 'Department name already exist.',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      )
    }
  }


  async updateEmailId() {
    if (this.validatingForm.invalid) {
      this.validatingForm.controls['newemailid'].markAsTouched();
    }
    else {
      this.department.newEmailId = this.department.newEmailId.trim();
      this.postservice.updateDepartmentEmailId(this.department).subscribe(
        (data: any) => {
          if (data.status == true) {
            Swal.fire({
              type: 'success',
              text: 'Email Id Updated successfully.',
              showConfirmButton: false,
              timer: 2000,
            });
            $("#myModal").modal("hide");
            this.GetDepartment();
          }
          else{
            Swal.fire({
              type: 'error',
              text: 'Email Id already exist.',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      )

      // var updateDepartmentEmailId = await this.postservice.updateDepartmentEmailId(this.department);
      // if (updateDepartmentEmailId.status == true) {
      //   Swal.fire({
      //     type: 'success',
      //     text: 'Email Id Updated successfully.',
      //     showConfirmButton: false,
      //     timer: 2000,
      //   });
      //   $("#myModal").modal("hide");
      //   this.GetDepartment();

      // }
    }


  }

  clear() {
    this.department.newdepartmentname = '';

  }

  edit(DepartmentID, email_id, department_designation, department_email) {
    this.department.emailId = email_id;
    this.department.newEmailId = email_id;
    this.department.emailIdTobeUpdated = department_email;
    this.department.departmentDesignation = department_designation;

    console.log()
    // this.router.navigate(['../admin/welcome/add-new-department'],{ queryParams: { Department_ID:DepartmentID} }); 

    this.getservice.getDepartmentName(DepartmentID).subscribe(
      (data: any) => {
        this.departmentDetail_byId = data.result;
        this.department.departmentname = this.departmentDetail_byId[0].departmentname;
        this.department.newdepartmentname = this.departmentDetail_byId[0].departmentname;
        this.department.departmentshortname = this.departmentDetail_byId[0].department_shortname;
        this.department.departmenthead = this.departmentDetail_byId[0].department_head;
        this.department.departmentid = this.departmentDetail_byId[0].id;
      }
    )

    this.getAllDesignations();
  }

  delete(DepartmentID, DepartmentName) {

    Swal.fire({
      //title: 'Are you sure?',
      text: "Are you sure you want to delete " + "'" + DepartmentName + "' department ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {

        this.getservice.DeleteDepartment(DepartmentID).subscribe((data: any) => {
          if (data.result == '3') {
            Swal.fire({
              type: 'error',
              text: 'This department is already assigned to user. Before deleting, change the assigned user department.',
              showConfirmButton: false,
              timer: 3000,
            });
          }
          else if (data.result == '1') {
            Swal.fire({
              type: 'success',
              text: 'Department name deleted successfully.',
              showConfirmButton: false,
              timer: 2000,
            });
            this.GetDepartment();
          }
        });
      }
    });

  }

  getAllDesignations() {
    this.getservice.getAllDesignation().subscribe(
      (data: any) => {
        this.allDesignations = data.result;
        var obj1 = {
          id: '0',
          designation: '--Select Designation--',
        }
        this.allDesignations.splice(0, 0, obj1);
        if (this.department.departmentDesignation != null && this.department.departmentDesignation != '' && this.department.departmentDesignation != undefined) {

        }
        else {
          this.department.departmentDesignation = this.allDesignations[0].id;
        }

      }
    )
  }

  changeForDesignation(args) {
    this.department.departmentDesignation = this.allDesignations[args.target.selectedIndex].id;
  }

  updateDesignation() {

    if (this.department.departmentDesignation == '0' || this.department.departmentDesignation == undefined || this.department.departmentDesignation == null) {
      Swal.fire({
        type: 'error',
        text: 'Please Select Designation',
        timer: 2000
      })
    }
    else {

      console.log('department Designation', this.department.departmentDesignation);
      console.log('department Id', this.department.departmentid);
      this.postservice.updateDepartmentDesignation(this.department).subscribe(
        (data: any) => {
          if (data.status == true) {
            Swal.fire({
              type: 'success',
              text: 'Designation Updated successfully.',
              showConfirmButton: false,
              timer: 2000,
            });
            $("#myModal").modal("hide");
            this.GetDepartment();
          }

        }
      )
    }
  }


  dataTable() {

    $(function () {

      var table = $('#dept_details').DataTable(
        {
          paging: false,
          dom: "<'row'<'col-sm-4 text-left'B><'col-sm-8'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'i><'col-sm-6'p>>",
          buttons: [


            {
              extend: 'excel',
              text: 'Export To Excel',
              exportOptions: {
                //columns: ':visible'
                columns: [0, 1, 2, 3]
              }
            },
            //     {
            //       extend: 'pdf',
            //       exportOptions: {
            //           columns: ':visible'
            //       }
            //   },

            //   {
            //     extend: 'csvHtml5',
            //     exportOptions: {
            //         columns: ':visible'
            //     }
            // },


            //         {
            //             extend: 'print',
            //             exportOptions: {
            //                 columns: ':visible'
            //             }
            //         },





          ],
          columnDefs: [{
            targets: -1,
            visible: true
          }],

        }
      );

      table.buttons().container()
        .appendTo('#Department_Master .col-md-6:eq(0)');

    });
  }

}
