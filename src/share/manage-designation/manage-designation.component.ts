import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare const $;
@Component({
  selector: 'app-manage-designation',
  templateUrl: './manage-designation.component.html',
  styleUrls: ['./manage-designation.component.scss']
})
export class ManageDesignationComponent implements OnInit {

  validatingForm: any;
  validatingFormModel: any;
  lbldanger: any;
  lblsuccess: any;
  register = {
    name: '',
  };
  Userdata: any;
  designationdetail = [];
  manageDesignationData = {
    designation_id: '',
    olddesignation_name: '',
    newDesignation_name: ''
  }
  addDesignationData = {
    designation_name: '',
  }
  DeleteDesignationData = {
    designation_id: '',
  }

  showLoader:boolean=false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postservice: PostServicesService, private getservice: GetServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.validation();
    this.model_validation();
    this.GetDesignation();
  }
  validation() {

    this.validatingForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

  }

  model_validation() {
    this.validatingFormModel = new FormGroup({
      newdesignationname: new FormControl(null, Validators.required)

    })
  }

  GetDesignation() {
    this.getservice.GetAllDesignation().subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.designationdetail = data.result;
          var obj = {
            id: 0,
            designation: '--Please Select Designation--'
          }
          this.designationdetail.splice(0, 0, obj);
          this.manageDesignationData.designation_id = this.designationdetail[0].id;
          this.manageDesignationData.olddesignation_name = this.designationdetail[0].designation;
          this.DeleteDesignationData.designation_id = this.designationdetail[0].id;
          this.showLoader=false;
          // this.manageHodData.dept_id = this.departmentdetail[0].id;
          // this.manageHodData.olddepartment_head = this.departmentdetail[0].department_head;
        }
        else {
          var obj1 = {
            id: 0,
            designation: '--Please Select Designation--',
          }
          this.designationdetail.splice(0, 0, obj1);
          this.showLoader=false;
        }
      });
  }

  changeDesignation(args) {
    this.manageDesignationData.designation_id = this.designationdetail[args.target.selectedIndex].id;
    this.manageDesignationData.olddesignation_name = this.designationdetail[args.target.selectedIndex].designation;
  }

  changeDesignationName(args) {
    this.DeleteDesignationData.designation_id = this.designationdetail[args.target.selectedIndex].id;
  }

  AddDesignation() {
    if (this.validatingFormModel.invalid) {
      this.validatingFormModel.controls['newdesignationname'].markAsTouched()
    }
    else {
      this.postservice.AddDesignation(this.addDesignationData).subscribe(res => {
        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            text: 'Designation name added successfully.',
            showConfirmButton: false,
            timer: 1500,
          });

          $("#myModal").modal("hide");
          this.validatingFormModel.reset();
          this.GetDesignation();
        }
        else if(res.result == '3')
        {
          Swal.fire({
            type: 'error',
            text: 'Designation name already exists.',
            showConfirmButton: false,
            timer: 1500,
          });
        }

      })
    }
  }

  updateNow() {
    if (this.manageDesignationData.designation_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Designation.',
        timer: 2000
      })
    }
    else if (this.validatingForm.invalid) {
      this.validatingForm.controls['name'].markAsTouched()
    }
    else {
      this.postservice.updateDesignation(this.manageDesignationData).subscribe(res => {
        if (res.result == '1') {
          Swal.fire({
            type: 'success',
            text: 'Designation name updated successfully.',
            showConfirmButton: false,
            timer: 1500,
          });
          this.GetDesignation();
          this.validatingForm.reset();
        }
      })
    }
  }

  DeleteDesignation() {
    if (this.DeleteDesignationData.designation_id == '0') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Designation.',
        timer: 2000
      })
    }
    else {
      Swal.fire({
        //title: 'Are you sure?',
        text: "Are you sure you want to delete this designation?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {

          this.postservice.DeleteDesignation(this.DeleteDesignationData).subscribe(res => {
            if (res.result == '3') {
              Swal.fire({
                type: 'error',
                text: 'This designation is already assigned to user. Before deleting, change the assigned user designation.',
                showConfirmButton: false,
                timer: 3000,
              });
            }
            else if (res.result == '1') {
              Swal.fire({
                text: 'Designation name deleted successfully.',
                type: 'success',
                timer: 2000
              });
              this.GetDesignation();
              $("#myModal2").modal("hide");
            }
          });

        }
      });
    }
  }


}
