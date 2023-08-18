import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
import * as myGlobals from '../../globalvar';

declare const $;

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.scss']
})
export class StaffInfoComponent implements OnInit {

  constructor(private postservice: PostServicesService, private getservice: GetServicesService,) { }
  Userdata: any;
  emp_detail = [];
  showLoader:boolean=false;
  
  EmployeeImage:any;
  ftpaddress= myGlobals.ftpaddress1;
  
  ngOnInit() {
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.GetEmployeeProfileData();

    this.showLoader = true; //loader on


  }

  GetEmployeeProfileData() {
    this.getservice.GetAllEmployeeProfileData_WithDeptName().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.emp_detail = data.result;
          this.showLoader = false; //loader off
          $('#TblDatatable').dataTable().fnDestroy();
          this.dataTable();
         
        }
        else {
          this.emp_detail = [];
        }
      });
  }

  getemployeeimage(registrationId)
  {
    this.getservice.GetAllEmployeePicture(registrationId).subscribe(
      (data: any) => {
        
        if (data.result[0].employeepic == null || data.result[0].employeepic == '' || data.result[0].employeepic == undefined) {
          this.EmployeeImage = this.ftpaddress + '/Profileimages/noImageAvailable.jpg';
        }
        else {
          this.EmployeeImage = data.result[0].employeepic;
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
            buttons: [  
              {
                extend: 'excel',
                text:'Export To Excel',
                exportOptions: {
                    //columns: ':visible'
                    columns: [0,1,3,4,5,6,7,8,9]
                }
            },
            ]
  
          }
        );
  
  
        
        table.buttons().container()
        .appendTo( '#Datatable_Master .col-md-6:eq(0)' );
  
      });

  }


}
