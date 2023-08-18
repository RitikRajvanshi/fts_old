import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';

@Component({
  selector: 'app-manage-file-holidays',
  templateUrl: './manage-file-holidays.component.html',
  styleUrls: ['./manage-file-holidays.component.scss']
})
export class ManageFileHolidaysComponent implements OnInit {
  Userdata: any;
  departmentdetail = [];

  fileholidays = {
    department_id: '',
    UrgentFileHoldingDays: '1',
    ImmediateFileHoldingDays: '1',
    NormalFileHoldingDays: ''
  }
  FileHolidaysData = [];
  showLoader: boolean = false;

  constructor(private getservice: GetServicesService, private postservice: PostServicesService) { }

  ngOnInit() {
    this.showLoader = true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.GetAllDepartment();
  }


  GetAllDepartment() {
    this.getservice.getAllDepartment_ForManageFileHolidays().subscribe(res => {
      if (res.result.length > 0) {
        this.departmentdetail = res.result;
        var obj = {
          id: 0,
          departmentname: '--Please Select Department--'
        }
        this.departmentdetail.splice(0, 0, obj);
        this.fileholidays.department_id = res.result[0].id;
        this.getFileHolidaysData(this.fileholidays.department_id);
      }
    })
  }

  selectDepartment(args) {
    this.fileholidays.department_id = this.departmentdetail[args.target.selectedIndex].id;
    this.getFileHolidaysData(this.fileholidays.department_id);
  }

  getFileHolidaysData(department_id) {
    this.getservice.getFileHolidaysData(department_id).subscribe(res => {
      this.FileHolidaysData = res.result;
      if (res.result.length > 0) {

        this.fileholidays.UrgentFileHoldingDays = res.result[0].urgent_holding_days;
        this.fileholidays.ImmediateFileHoldingDays = res.result[0].immediate_holding_days;
        this.fileholidays.NormalFileHoldingDays = res.result[0].normal_holding_days;
        this.showLoader = false;
      }
      else {
        this.fileholidays.UrgentFileHoldingDays = '';
        this.fileholidays.ImmediateFileHoldingDays = '';
        this.fileholidays.NormalFileHoldingDays = '';
        this.showLoader = false;
      }
    });
  }

  submit() {
    if (this.fileholidays.department_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Department.',
        timer: 2000
      })
    }
    else {
      this.postservice.updateFileHolidaysData(this.fileholidays).subscribe(res => {
        if (res.status == true) {
          Swal.fire({
            type: 'success',
            text: 'File holding added successfully.',
            timer: 2000
          })
        }
      });
    }
  }

}
