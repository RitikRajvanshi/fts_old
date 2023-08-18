import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { PostServicesService } from 'src/app/services/post-services.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { Router } from '@angular/router';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
@Component({
  selector: 'app-file-initiation',
  templateUrl: './file-initiation.component.html',
  styleUrls: ['./file-initiation.component.scss']
})
export class FileInitiationComponent implements OnInit {
  validatingForm: FormGroup;
  config = {
    placeholder: 'Please input note content',
    tabsize: 2,
    height: 250,
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['codeview', 'undo', 'redo']],
      // ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'link', 'hr']]
      // ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    // tslint:disable-next-line:max-line-length
    fontNames: ['Kruti Dev 010', 'Bauhaus 93', 'Algerian', 'Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times', 'DauphinPlain', 'Times New Roman', 'Calibri']
  };
  Userdata: any;
  filecount: any;
  hideDates = true;
  totalfilesOnMyDepartment: any;
  fileinitiation = {
    filereadonlydata: '',
    filename: '',
    createdby: '',
    department: '',
    subject: '',
    filecategoryid: '',
    filecategoryname: '',
    priority: ''

  }
  assignfile = {
    filename: '',
    file_id: '',
    assigned_to: '',
    assigned_by: '',
    assigned_to_userid: '',
    assigned_to_username: ''
  }
  profiledetail: any;
  filecategorydata = [];
  priorities = [];
  fileId = [];

  sendmail = {
    user_email: '',
    filename: '',
    departmentname: '',
    user_name: '',
    created_date: new Date(),
    file_category: ''
  }
  financialYear: any;
  LeaveInfo = {
    leave_start: ({ jsdate: new Date() }),
    leave_end: ({ jsdate: new Date() }),
    employee_id: '',
    remarks: ''
  }
  showLoader: boolean = false;

  constructor(private postservice: PostServicesService, private getservice: GetServicesService, private router: Router) { }

  ngOnInit() {
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.fileinitiation.createdby = this.Userdata.registrationid;
    //this.getfilecount();
    this.getAllPriorities();
    this.getfileId();

    this.validation();





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
      filereadonlydata: new FormControl(),
      filename: new FormControl(null, Validators.required),
      subject: new FormControl(),
      leave_start: new FormControl(null, Validators.required),
      leave_end: new FormControl(null, Validators.required),
    });
  }









  

  getFinancialYear() {

    this.financialYear = '';
    var today = new Date();//get current date
    var curMonth = today.getMonth();//get current month

    if (curMonth > 3) { //
      var nextYr1 = (today.getFullYear() + 1).toString();
      this.financialYear = today.getFullYear().toString() + "-" + nextYr1.charAt(2) + nextYr1.charAt(3);
    } else {
      var nextYr2 = today.getFullYear().toString();
      this.financialYear = (today.getFullYear() - 1).toString() + "-" + nextYr2.charAt(2) + nextYr2.charAt(3);
    }

  }

  getUserProfile() {
    this.getservice.GetProfileData_FileInitiation(this.fileinitiation.createdby).subscribe(res => {
      this.profiledetail = res;
      this.fileinitiation.department = this.profiledetail[0].department;
      this.sendmail.departmentname = this.profiledetail[0].departmentname;
      this.sendmail.user_email = this.profiledetail[0].email_id;
      this.sendmail.user_name = this.profiledetail[0].first_name + ' ' + this.profiledetail[0].last_name;
      this.financialYear = this.profiledetail[0].financialYear;
      //this.fileinitiation.filename = this.fileinitiation.filereadonlydata + '/' + 'BSIP/' + this.profiledetail[0].financialYear + '/' + this.fileinitiation.filecategoryname + '/' + this.profiledetail[0].departmentname + '/' + this.sendmail.user_name;
      this.fileinitiation.filename = 'BSIP/' + this.profiledetail[0].financialYear + '/' + this.fileinitiation.filecategoryname + '/' + this.profiledetail[0].departmentname + '/' + this.sendmail.user_name;
    });
  }

  getfileId() {
    this.fileId = [];
    this.getservice.GetFileId().subscribe(res => {
      this.fileId = res.result;

      if (this.fileId[0].value == null || this.fileId[0].value == '' || this.fileId[0].value == undefined) {
        this.fileinitiation.filereadonlydata = '1';
      }
      else {
        this.fileinitiation.filereadonlydata = this.fileId[0].value;
      }

      this.getfilecategory();
    });
  }

  getfilecount() {
    this.getservice.GetFileCount().subscribe(res => {
      this.filecount = res.result;
    });
  }

  getfilecategory() {
    this.getservice.GetFileCategory().subscribe(res => {
      this.filecategorydata = res.result;

      var obj = {
        id: 0,
        category_name: '--Please Select File Category--',
      }
      this.filecategorydata.splice(0, 0, obj);

      this.fileinitiation.filecategoryid = this.filecategorydata[0].id;
      this.fileinitiation.filecategoryname = this.filecategorydata[0].category_name;
      this.sendmail.file_category = this.filecategorydata[0].category_name;
      this.getUserProfile();
    });
  }


  getAllPriorities() {
    this.getservice.GetAllPriorities().subscribe(res => {
      this.priorities = res.result;
      this.fileinitiation.priority = this.priorities[0].id;
    });
  }


  selectFileCategory(args) {
    if (this.filecategorydata[args.target.selectedIndex].isleave == true) {
      this.hideDates = false;
    }
    else {
      this.hideDates = true;
    }
    this.fileinitiation.filecategoryid = this.filecategorydata[args.target.selectedIndex].id;
    this.fileinitiation.filecategoryname = this.filecategorydata[args.target.selectedIndex].category_name;
    this.sendmail.file_category = this.filecategorydata[args.target.selectedIndex].category_name;
    //this.fileinitiation.filename = this.fileinitiation.filereadonlydata + '/' + 'BSIP/' + this.financialYear + '/' + this.fileinitiation.filecategoryname + '/' + this.profiledetail[0].departmentname + '/' + this.sendmail.user_name;
    this.fileinitiation.filename = 'BSIP/' + this.financialYear + '/' + this.fileinitiation.filecategoryname + '/' + this.profiledetail[0].departmentname + '/' + this.sendmail.user_name;
  }

  changePriority(args) {
    this.fileinitiation.priority = this.priorities[args.target.selectedIndex].id;
  }


  submit() {

    if (this.hideDates == false) {
      this.checkTwodates();
    }
    else {
      this.CreatedFile();
    }
  }

  checkTwodates() {

    var startdate = (this.LeaveInfo.leave_start.jsdate.getMonth() + 1) + '/' + this.LeaveInfo.leave_start.jsdate.getDate() + '/' + this.LeaveInfo.leave_start.jsdate.getFullYear()
    var enddate = (this.LeaveInfo.leave_end.jsdate.getMonth() + 1) + '/' + this.LeaveInfo.leave_end.jsdate.getDate() + '/' + this.LeaveInfo.leave_end.jsdate.getFullYear()

    var validate = this.compare_dates(new Date(startdate), new Date(enddate));

    if (validate == false) {
      Swal.fire({
        type: 'error',
        text: 'End Date should be greater or equal to Start Date.',

      })
      //this.showLoader=false;
    }
    else {
      this.CreatedFile();
    }

  }


  compare_dates = function (date1, date2) {
    //   if (date1>date2) return ("Date1 > Date2");
    // else if (date1<date2) return ("Date2 > Date1");
    // else return ("Date1 = Date2"); 
    if (date1 > date2) return false;
    else if (date1 < date2) return true;
    else return true;
  }

  async CreatedFile() {
    if (this.validatingForm.invalid) {
      this.validatingForm.controls['filename'].markAsTouched();
      // this.validatingForm.controls['subject'].markAsTouched();     

    }
    else if (this.fileinitiation.filecategoryid == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select File Category.',
        timer: 2000
      })
    }
    else {

      this.showLoader = true;
      // this.fileinitiation.filename = this.fileinitiation.filereadonlydata + this.fileinitiation.filename;
      this.sendmail.filename = this.fileinitiation.filename;

      var createdfile = await this.postservice.CreateFile(this.fileinitiation);
      //if (createdfile.status == true) {
      if (createdfile.result[0].file_id_new > 0) {

        if (this.hideDates == false) {
          this.submitLeaveInfo();
        }

        Swal.fire({
          type: 'success',
          html: '<strong>File Id - ' + createdfile.result[0].file_id_new + '</strong> is created successfully.',
          showConfirmButton: true,
          //timer: 3000
        }).then((result) => {
          if (result.value) {

            this.fileinitiation.subject = '';
            this.getfileId();
            this.getfilecategory();
            this.getUserProfile();
            this.SendMail();

          }
        })

        this.UpdateLatestFileCountOnMyDepartment();

      }


      setTimeout(() => {
        this.showLoader = false;
      }, 3000);


      //}
    }

  }

  SendMail() {
    this.postservice.SendMailToFileInitialisedUser(this.sendmail).subscribe(data => {
      if (data.success == true) {
        // Swal.fire({
        //   type: 'success',
        //   text: 'Guest Message Brodcast.',
        //   showConfirmButton: false,
        //   timer: 2000
        // })

      }
    });
  }



  UpdateLatestFileCountOnMyDepartment() {
    this.getservice.GetFileByDepartmentIdAndRegistrationId(this.profiledetail[0].department, this.profiledetail[0].registration_id).subscribe(res => {

      this.totalfilesOnMyDepartment = res.result;
      this.getservice.postLatestCountOfFiles(this.totalfilesOnMyDepartment.length);

      this.showLoader = false;


    },
      error => alert(error),
      () => console.log('Finished')
    );

  }

  submitLeaveInfo() {
    // if (this.validatingForm.invalid) {
    //   this.validatingForm.controls['leave_start'].markAsTouched(),
    //     this.validatingForm.controls['leave_end'].markAsTouched(),
    //     this.validatingForm.controls['remarks'].markAsTouched()
    // }
    //  else {
    //    this.orgData.day= this.getDayofWeek(this.orgData.HolidayDate.jsdate.getDay());
    this.LeaveInfo.employee_id = this.Userdata.registrationid;
    this.LeaveInfo.remarks = this.fileinitiation.subject + '-Leave';
    this.postservice.insertLeaveInfo(this.LeaveInfo).subscribe(res => {
      if (res.result == '1') {
        // Swal.fire({
        //   type: 'success',
        //   text: 'Holiday submit successfully.',
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
        // this.validatingForm.reset();
        this.hideDates = true;
        this.LeaveInfo.leave_start = ({ jsdate: new Date() });
        this.LeaveInfo.leave_end = ({ jsdate: new Date() });
        this.LeaveInfo.remarks = ''

      }

    })
    // }
  }

}
