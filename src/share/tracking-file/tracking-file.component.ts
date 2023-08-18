import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TrackingFileService } from 'src/app/services/tracking-file.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import Swal from 'sweetalert2';
import { VERSION } from '@angular/material';
import { MatSelect } from '@angular/material';
import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as myGlobals from '../../globalvar';
declare const $;

interface Bank {
  file_id: string;
  filename: string;
}

@Component({
  selector: 'app-tracking-file',
  templateUrl: './tracking-file.component.html',
  styleUrls: ['./tracking-file.component.scss'],

})
export class TrackingFileComponent implements OnInit {
  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks */
  // private banks: Bank[] = [
  //  {name: 'Bank A (Switzerland)', id: 'A'},
  //  {name: 'Bank B (Switzerland)', id: 'B'},
  //  {name: 'Bank C (France)', id: 'C'},
  //  {name: 'Bank D (France)', id: 'D'},
  //  {name: 'Bank E (France)', id: 'E'},
  //  {name: 'Bank F (Italy)', id: 'F'},
  //  {name: 'Bank G (Italy)', id: 'G'},
  //  {name: 'Bank H (Italy)', id: 'H'},
  //  {name: 'Bank I (Italy)', id: 'I'},
  //  {name: 'Bank J (Italy)', id: 'J'},
  //  {name: 'Bank K (Italy)', id: 'K'},
  //  {name: 'Bank L (Germany)', id: 'L'},
  //  {name: 'Bank M (Germany)', id: 'M'},
  //  {name: 'Bank N (Germany)', id: 'N'},
  //  {name: 'Bank O (Germany)', id: 'O'},
  //  {name: 'Bank P (Germany)', id: 'P'},
  //  {name: 'Bank Q (Germany)', id: 'Q'},
  //  {name: 'Bank R (Germany)', id: 'R'} 
  // ]

  private banks: Bank[] = [];

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  /** list of banks filtered by search keyword for multi-selection */
  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect', { static: false }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();






  Userdata: any;
  DepartmentId: any;
  RegistrationId: any;
  fileID: any;
  fileName: any;
  ProfileDetails = [];
  FileNameDetails = [];
  FileTrackingData = [];
  departmentDetail: any;

  blankObject = {

    assigned_by: "",
    assigned_by_department: "",
    assigned_to_department: "",
    assigned_to_userid: "",
    assigneddate: "",
    courierboy_name: "",
    file_id: 202,
    file_remarks: "",
    filename: "",
    id: '',
    received_date: "",
    received_status: "",
    receiverdept: "",
    receivername: "",
    senderdept: "",
    sendername: ""
  }
  showLoader: boolean = false;
  fileSubject: any;
  total_attachedfiles = [];
  filePath_forAttachedFile:string;

  constructor(private trackingfile: TrackingFileService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader = true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.RegistrationId = this.Userdata.registrationid;
    this.getProfileDetails(this.RegistrationId);


  }



  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.filename.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter(bank => bank.filename.toLowerCase().indexOf(search) > -1)
    );
  }

  private setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function 
        // triggers initializing the selection according to the initial value of 
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially 
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a.file_id === b.file_id;
      });
  }

  getProfileDetails(RegistrationId) {
    this.trackingfile.getProfileDetails(RegistrationId).subscribe(res => {
      this.ProfileDetails = res;
      this.DepartmentId = this.ProfileDetails[0].department;
      this.getFileName(this.RegistrationId, this.DepartmentId);
      //this.getDepartmentname();
    });
  }

  getFileName(RegistrationId, DepartmentId) {
    this.trackingfile.getFileName_forfiletracking(RegistrationId, DepartmentId).subscribe(res => {

      if (res.result.length == 0) {
        this.fileName = "No File Available";
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader = false;
      }
      else {

        this.FileNameDetails = res.result;
        this.fileID = this.FileNameDetails[0].file_id;
        this.fileName = this.FileNameDetails[0].filename;
        this.fileSubject = this.FileNameDetails[0].subject;
        this.getFileTrackingData(this.fileID);


        this.banks = res.result;
        // set initial selection
        this.bankCtrl.setValue(this.banks[0]);

        // load the initial bank list
        this.filteredBanks.next(this.banks.slice());
        this.filteredBanksMulti.next(this.banks.slice());

        // listen for search field value changes
        this.bankFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanks();
          });
        this.bankMultiFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanksMulti();
          });
      }

    });
  }

  selectchangeforfile(args) {

    this.fileID = args.source.value.file_id;
    this.fileName = args.source.value.filename;
    this.fileSubject = args.source.value.subject;

    //  this.fileID = this.FileNameDetails[args.target.selectedIndex].file_id;
    // this.fileName = this.FileNameDetails[args.target.selectedIndex].filename;
    this.getFileTrackingData(this.fileID);
  }


  getFileTrackingData(file_id) {
    this.trackingfile.getFileTrackingData(file_id).subscribe(res => {
      if (res.result.length > 0) {
        this.FileTrackingData = res.result;
        for (let i = 0; i < 10; i++) {
          this.FileTrackingData.push(this.blankObject);
        }
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


  getDepartmentname() {
    this.getservice.getDepartmentName(this.ProfileDetails[0].department).subscribe(res => {
      this.departmentDetail = res.result;
    });
  }

  getaddattachmentRowId(file_id, RowId) {
    this.filePath_forAttachedFile = myGlobals.ftpaddress1 +'/' + 'Attachedfile/'+ file_id;
    this.getservice.getAttachedFiles_RowIdAndFileIdBased(file_id, RowId).subscribe(res => {
      this.total_attachedfiles = res.result;
    })
  }


  dataTable() {

    var filename = this.fileName;
    var fileSubject = this.fileSubject;
    $(function () {

      var table = $('#TblDatatable').DataTable(
        {
          paging: false,
          destroy: true,
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
                return '<br/><h3 style=\'float: left\'>File Name-' + filename + '</h3><br/><br/> <h3 style=\'float: left\'>File Subject-' + fileSubject + '</h3><br/><br/><br/>';
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
