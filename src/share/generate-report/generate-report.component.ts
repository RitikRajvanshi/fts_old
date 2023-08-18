import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { PostServicesService } from 'src/app/services/post-services.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
declare const $;

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  reportDate = ({ jsdate: new Date() })
  validatingForm: any;
  DateWiseData = [];


  constructor(private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.validation();
    this.dataTable();
  }

  validation() {
    this.validatingForm = new FormGroup({
      generatedate: new FormControl(),
    });
  }

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd-mmm-yyyy',
  };

  selectedDates: Array<string> = [];
  onDateChanged(event: IMyDateModel): void {
    let index: number;
    this.selectedDates[index] = event.formatted;

  }


  GetReport() {
    this.getservice.getReportData_Datewise(this.reportDate).subscribe(res => {
      if (res.result.length > 0) {
        this.DateWiseData = res.result;
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
      }
      else{
        this.DateWiseData = [];
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
      }
    },
      error => console.log('Error has occured.')
    )
  }


  dataTable() {

    $(function () {
      var table = $('#TblDatatable').DataTable(
        {
          paging:false,
         
          buttons: [
            {
              extend: 'excel',
              text: 'Export To Excel',
              exportOptions: {
                columns: ':visible'
                //columns: [0, 1, 2]
              },
            
            }
            
          ]

        }
      );

      table.buttons().container()
        .appendTo('#Datatable_Master .col-md-6:eq(0)');

    });

  }

}
