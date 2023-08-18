import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
declare const $;


@Component({
  selector: 'app-total-no-of-files',
  templateUrl: './total-no-of-files.component.html',
  styleUrls: ['./total-no-of-files.component.scss']
})
export class TotalNoOfFilesComponent implements OnInit {

  TotalFilesData = [];
  showLoader: boolean = false;

  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader = true;
    this.GetTotalFiles();
  }

  

  GetTotalFiles() {
    this.getservice.GetDatewiseTotalFiles().subscribe(res => {
     
      if (res.result.length > 0) {
        this.TotalFilesData = res.result;

        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader = false;
      }
      else {
        this.TotalFilesData = [];
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader = false;
      }
    })
  }


  dataTable() {

    $(function () {

      var table = $('#TblDatatable').DataTable(
        {
          paging: false,
          dom: "<'row'<'col-sm-4 text-left'B><'col-sm-8'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'i><'col-sm-6'p>>",

          buttons: [
            {
              extend: 'excel',
              text: 'Export To Excel',
            },
            {
              extend: 'print',
              customize: function (win) {


                $(win.document.messageTop)
                  .css('background-color', 'red')

              }






            },
          ],

        }
      );

      table.buttons().container()
        .appendTo('#Department_Master .col-md-6:eq(0)');

    });
  }

}
