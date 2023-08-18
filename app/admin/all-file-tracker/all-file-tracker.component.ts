import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TrackingFileService } from 'src/app/services/tracking-file.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { VERSION } from '@angular/material';
import { MatSelect } from '@angular/material';
import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
declare const $;


interface Bank {
  file_id: string;
  filename: string;
}

@Component({
  selector: 'app-all-file-tracker',
  templateUrl: './all-file-tracker.component.html',
  styleUrls: ['./all-file-tracker.component.scss']
})
export class AllFileTrackerComponent implements OnInit {
 
  Userdata: any;
  DepartmentId: any;
  RegistrationId: any;
  fileID: any;
  fileName: any;
  FileNameDetails = [];
  FileTrackingData = [];

  TotalFilesCount:any;
  showLoader: boolean = false;
  fileSubject:any;

  constructor(private trackingfile: TrackingFileService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader = true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.RegistrationId = this.Userdata.registrationid;
    this.getTotalFileCount();
    this.getFileName();
  }

  getTotalFileCount() {
    this.trackingfile.getAllFileCount().subscribe(res => {
      this.TotalFilesCount = res.result[0].totalfiles;
    });
  }


  getFileName() {
    this.trackingfile.getAllFileName_forallfiletracking().subscribe(res => {
      this.FileNameDetails = res.result;

      this.fileID = this.FileNameDetails[0].file_id;
      this.fileName = this.FileNameDetails[0].filename;
      this.fileSubject = this.FileNameDetails[0].subject;
      this.getFileTrackingData(this.fileID);

    });
  }

 
  selectchangeforfile(args) {

    this.fileID = this.FileNameDetails[args.target.selectedIndex].file_id;
    this.fileName = this.FileNameDetails[args.target.selectedIndex].filename;
    this.fileSubject = this.FileNameDetails[args.target.selectedIndex].subject;
    this.getFileTrackingData(this.fileID);
  }


  getFileTrackingData(file_id) {
    this.trackingfile.getFileTrackingData(file_id).subscribe(res => {
      if (res.result.length > 0) {
        this.FileTrackingData = res.result;

        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader = false;

      }
      else {
        this.FileTrackingData = [];
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader = false;
      }


    });
  }



  dataTable() {

    var filename = this.fileName;
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
              exportOptions: {
                columns: ':visible'
              }
            },
            {
              extend: 'print',
              customize: function (win) {

                $(win.document.messageTop)
                  .css('background-color', 'red')

              },
              messageTop: function () {
                //return 'File Name: '+filename;
                return '<br/><h3 style=\'float: left\'>File Name-' + filename + '</h3><br/><br/><br/>';
              }

            }]
        }
      );

      table.buttons().container()
        .appendTo('#Datatable_Master .col-md-6:eq(0)');

    });
  }


}
