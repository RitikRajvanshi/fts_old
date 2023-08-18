import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
declare const $;

@Component({
  selector: 'app-file-holding-information',
  templateUrl: './file-holding-information.component.html',
  styleUrls: ['./file-holding-information.component.scss']
})
export class FileHoldingInformationComponent implements OnInit {
  Userdata: any;
  FileHoldingData = [];
  showLoader:boolean=false;
  constructor(private getservice: GetServicesService, private postservice: PostServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.GetFileHoldingDetails();
  }


  GetFileHoldingDetails() {
    this.getservice.GetFileHoldingData().subscribe(res => {
      if (res.result.length > 0) {
        this.FileHoldingData = res.result;
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader=false;
      }
      else {
        this.FileHoldingData = [];
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
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
              text: 'Export To Excel',
              exportOptions: {
                columns: ':visible'
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
