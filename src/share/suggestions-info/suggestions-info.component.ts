import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';

declare const $;

@Component({
  selector: 'app-suggestions-info',
  templateUrl: './suggestions-info.component.html',
  styleUrls: ['./suggestions-info.component.scss']
})
export class SuggestionsInfoComponent implements OnInit {

  Userdata: any;
  SuggestionsData = [];
  showLoader:boolean=false;
  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.getAllSuggestionsData();
  }


  getAllSuggestionsData() {
    this.getservice.getSuggestionsData().subscribe(res => {
      this.SuggestionsData = res.result;
      $('#TblDatatable').dataTable().fnDestroy();
      this.dataTable();
      this.showLoader=false;
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
                exportOptions: { columns: ':visible' }
              }
            ]
          }
        );

        table.buttons().container()
          .appendTo('#Datatable_Master .col-md-6:eq(0)');
      });

  }

}
