import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GetServicesService } from 'src/app/services/get-services.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
declare const $;

@Component({
  selector: 'app-holding-files-datewise-report',
  templateUrl: './holding-files-datewise-report.component.html',
  styleUrls: ['./holding-files-datewise-report.component.scss']
})
export class HoldingFilesDatewiseReportComponent implements OnInit {
  reportDate = ({ jsdate: new Date() })
  validatingForm: any;
  DateWiseData = [];

  constructor(private getservice: GetServicesService) { }

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
    this.getservice.getholdingfilesdatewisereport(this.reportDate).subscribe(res => {
      if (res.result.length > 0) {
        this.DateWiseData = res.result;
        $('#TblDatatable').dataTable().fnDestroy();
        this.dataTable();
      }
      else {
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
          paging: false,

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
