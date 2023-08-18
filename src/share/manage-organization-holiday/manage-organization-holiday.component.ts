import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
declare const $;

@Component({
  selector: 'app-manage-organization-holiday',
  templateUrl: './manage-organization-holiday.component.html',
  styleUrls: ['./manage-organization-holiday.component.scss']
})
export class ManageOrganizationHolidayComponent implements OnInit {

  validatingForm: any;
  orgData = {
    HolidayDate: ({ jsdate: new Date() }),
    HolidayName: '',
    day: '',
    holiday_type:''
  }
  HolidayData = [];

  holiday_type=[{id:0,type:'Restricted Holiday'},{id:0,type:'Gazetted Holiday'}];
  showLoader: boolean = false;
  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader = true;
    this.validation();
    this.getHolidayData();
  }



  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd-mmm-yyyy',
  };

  selectedDates: Array<string> = [];
  onDateChanged(event: IMyDateModel): void {
    let index: number;
    this.selectedDates[index] = event.formatted;

  }

  validation() {

    this.validatingForm = new FormGroup({
      HolidayDate: new FormControl(null, Validators.required),
      HolidayName: new FormControl(null, Validators.required),

    });
  }

  getHolidayData() {
    this.getservice.getHolidayData().subscribe(res => {
      if (res.result.length > 0) {
        this.HolidayData = res.result;
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader = false;
      }
      else {
        this.HolidayData = [];

        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader = false;
      }
    })
  }


  
  changeForTypeOfHoliday(args) {

    //  this.getservice.getUserIdByREgistration(this.assignToUser[args.target.selectedIndex].assignEmail).subscribe(res => {

    this.orgData.holiday_type = this.holiday_type[args.target.selectedIndex].type;

    //  })
  }


  submit() {
    if (this.validatingForm.invalid) {
      this.validatingForm.controls['HolidayDate'].markAsTouched(),
        this.validatingForm.controls['HolidayName'].markAsTouched()
    }
    else {
 if( this.orgData.holiday_type==''|| this.orgData.holiday_type==undefined ||  this.orgData.holiday_type==null)
 {
  Swal.fire({
    type: 'error',
    text: 'Please Select Type of Holiday',
    timer: 2000
  })
 }
 else{

      this.orgData.day = this.getDayofWeek(this.orgData.HolidayDate.jsdate.getDay());

      this.postservice.insertHoliday(this.orgData).subscribe(res => {
        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            text: 'Holiday added successfully.',
            showConfirmButton: false,
            timer: 2000,
          });
          this.validatingForm.reset();
          this.orgData.HolidayDate = ({ jsdate: new Date() });
          $("#myModal").modal("hide");
          this.getHolidayData();
        }
        else if (res.result == '3') {
          Swal.fire({
            type: 'error',
            text: 'Holiday date already exist.',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
    }
    }
  }

  DeleteHoliday(id) {

    Swal.fire({
      //title: 'Are you sure?',
      text: "Are you sure you want to delete a holiday ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {


        this.getservice.DeleteHoliday(id).subscribe(res => {
          if (res.status == true) {
            Swal.fire({
              type: 'success',
              text: 'Holiday deleted successfully.',
              showConfirmButton: false,
              timer: 2000,
            });
            this.getHolidayData();
          }
        });
      }
    });

  }

  getDayofWeek(dayid) {
    var day;
    switch (dayid) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";

    }
    return day;
  }


  dataTable() {

    $(function () {

      var table = $('#TblDatatable').DataTable(
        {
          "autoWidth": true,
          "lengthMenu": [[100, 200, 300, 400, -1], [100, 200, 300, 400, "All"]],
          //dom: 'Bfrtip',
          dom: 'B<"top"fp<"clear">>rt<"bottom"ip<"clear">>',

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
