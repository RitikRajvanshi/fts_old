import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
declare const $;

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  constructor(private postservice: PostServicesService, private getservice: GetServicesService, private router: Router) { }
  Userdata: any;
  emp_detail = [];

  isactive_user: any;
  enableUser = {
    registration_id: '',
    isactive: 'true'
  }
  disableUser = {
    registration_id: '',
    isactive: 'false'
  }
  registration_id: any;
  showLoader: boolean = false;
  ngOnInit() {
    this.showLoader = true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.GetEmployeeProfileData();
  }

  GetEmployeeProfileData() {
    this.getservice.GetAllEmployeeProfileData_WithDeptNameforManageUser().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.emp_detail = data.result;
          //this.isactive_user = this.emp_detail[0].isactive;
          $('#staffinfo').dataTable().fnDestroy();
          this.dataTable();
          this.showLoader = false;
        }
        else {
          this.emp_detail = [];
          $('#staffinfo').dataTable().fnDestroy();
          this.dataTable();
          this.showLoader = false;
        }
      });
  }

  user_registration_id(registration_id) {
    this.registration_id = registration_id;
  }

  EnableCustomer() {
    this.enableUser.registration_id = this.registration_id;
    this.postservice.EnableDisableUser(this.enableUser).subscribe(
      res => {

        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            title: 'User enabled successfully.',
            showConfirmButton: false,
            timer: 2000
          })

          $("#EnabledCustomer").modal("hide");

          $('#staffinfo').dataTable().fnDestroy();
          this.dataTable();
          this.isactive_user = true;
          this.GetEmployeeProfileData();
        }
        else {
          Swal.fire({
            type: 'error',
            title: 'Not enabled.',
            showConfirmButton: false,
            timer: 2000

          })

        }

      },
      error => console.log('Error has occured.')
    );
  }

  EditUser(registration_id) {
    this.router.navigate(['/admin/welcome/add-user'], { queryParams: { registration_id: registration_id } });
  }



  DisableCustomer() {
    this.disableUser.registration_id = this.registration_id;
    this.postservice.EnableDisableUser(this.disableUser).subscribe(
      res => {

        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            title: 'User disabled successfully.',
            showConfirmButton: false,
            timer: 2000
          })

          $("#DisableCustomer").modal("hide");

          this.GetEmployeeProfileData();
          this.isactive_user = false;


        }
        else {
          Swal.fire({
            type: 'error',
            title: 'Not disabled.',
            showConfirmButton: false,
            timer: 2000

          })

        }

      },
      error => console.log('Error has occured.')
    );


  }

  dataTable() {

    $(function () {

      var table = $('#staffinfo').DataTable(
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
                columns: [0, 1, 2, 3, 4]
              }
            },
          ],

          columnDefs: [{
            "targets": [5,6],
            "searchable": false,
            "orderable": false
          },{
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