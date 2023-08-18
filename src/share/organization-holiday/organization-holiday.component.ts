import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
declare const $;

@Component({
  selector: 'app-organization-holiday',
  templateUrl: './organization-holiday.component.html',
  styleUrls: ['./organization-holiday.component.scss']
})
export class OrganizationHolidayComponent implements OnInit {

  validatingForm: any;
 
  HolidayData = [];
  showLoader:boolean=false;
  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
   this.showLoader=true;
    this.getHolidayData();
  }



  getHolidayData() {
    this.getservice.getHolidayData().subscribe(res => {
      if (res.result.length > 0) {
        this.HolidayData = res.result;
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader=false;
      }
      else {
        this.HolidayData = [];
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
      }
    })
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
              text: 'Export To Excel',
              exportOptions: {
                //columns: ':visible'
                columns: [0, 1, 2,3,4]
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
