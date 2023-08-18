import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
declare const $;


@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  userCredentialData = [];
  showLoader: boolean = false;

  ngOnInit() {
    this.showLoader = true;
    this.UserCredentialData();
  }


  UserCredentialData() {
    this.getservice.getUserCredentials().subscribe(res => {
     
      if (res.result.length > 0) {
        this.userCredentialData = res.result;

        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader = false;

      }
      else {
        this.userCredentialData = [];
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
            }
          ],

        }
      );

      table.buttons().container()
        .appendTo('#Department_Master .col-md-6:eq(0)');

    });
  }
}
