import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
declare const $;

@Component({
  selector: 'app-leave-info',
  templateUrl: './leave-info.component.html',
  styleUrls: ['./leave-info.component.scss']
})
export class LeaveInfoComponent implements OnInit {

  validatingForm: any;
  Userdata:any;
  orgData = {
    leave_start: ({ jsdate: new Date() }),
    leave_end: ({ jsdate: new Date() }),
    employee_id:'',
    remarks: ''
  }

  LeaveData = [];
  showLoader:boolean=false;
  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.orgData.employee_id=this.Userdata.registrationid;
    this.validation();
    this.getLeaveInfoData();
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
      leave_start: new FormControl(null, Validators.required),
      leave_end: new FormControl(null, Validators.required),
      remarks: new FormControl(null, Validators.required),

    });
  }

  getLeaveInfoData() {
    this.getservice.getLeaveInfo(this.orgData.employee_id).subscribe(res => {
      if (res.result.length > 0) {
        this.LeaveData =res.result;
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader=false;
      }
      else {
        this.LeaveData = [];
        this.showLoader=false;
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
      }
    })
  }

  submit() {
    if (this.validatingForm.invalid) {
      this.validatingForm.controls['leave_start'].markAsTouched(),
        this.validatingForm.controls['leave_end'].markAsTouched(),
        this.validatingForm.controls['remarks'].markAsTouched()
    }
    else {
  //    this.orgData.day= this.getDayofWeek(this.orgData.HolidayDate.jsdate.getDay());

      this.postservice.insertLeaveInfo(this.orgData).subscribe(res => {
        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            text: 'Holiday submit successfully.',
            showConfirmButton: false,
            timer: 2000,
          });
          this.validatingForm.reset();
          this.orgData.leave_start = ({ jsdate: new Date() });
          this.orgData.leave_end = ({ jsdate: new Date() });
          this.orgData.remarks = ''

          $("#myModal").modal("hide");
          this.getLeaveInfoData();
        }
        // else if (res.result == '3') {
        //   Swal.fire({
        //     type: 'error',
        //     text: 'Holiday date already exist.',
        //     showConfirmButton: false,
        //     timer: 2000,
        //   });
        // }
      })
    }
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
                columns: [0, 1, 2]
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
