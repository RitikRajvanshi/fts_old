import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';

declare const $;

@Component({
  selector: 'app-dept-info',
  templateUrl: './dept-info.component.html',
  styleUrls: ['./dept-info.component.scss']
})
export class DeptInfoComponent implements OnInit {
  departmentdetail = [];
  Userdata: any;
  showLoader:boolean=false;
  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    //this.assignedFileData.assigned_by = this.Userdata.registrationid;
    this.GetDepartment();
  }

  GetDepartment() {
    this.getservice.GetAllDepartment().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.departmentdetail = data.result;
          $('#TblDatatable').dataTable().fnDestroy();
          this.dataTable();
          this.showLoader=false;
        }
        else {
          this.departmentdetail = [];
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
                  columns: ':visible'
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
