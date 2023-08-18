import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';

declare const $;

@Component({
  selector: 'app-file-categories',
  templateUrl: './file-categories.component.html',
  styleUrls: ['./file-categories.component.scss']
})
export class FileCategoriesComponent implements OnInit {

  Userdata: any;
  categorydetail = [];
  categoryUserDetail = [];
  userdetail = [];
  category = {
    categoryname: '',
    newcategoryname: '',
    categoryid: ''
  }
  validatingForm: any;
  CategoryDetail_byId = [];
  validatingFormModel: any;
  addCategoryData = {
    category_name: ''
  }

  showLoader:boolean=false;

  constructor(private router: Router, private getservice: GetServicesService, private postservice: PostServicesService) { }

  ngOnInit() {
    this.showLoader=true;
    this.Userdata = JSON.parse(sessionStorage.getItem('LoginStatus'));
    // this.GetProfileDetail(this.Userdata.registrationid);
    // this.GetEmployeeProfileData();
    this.GetCategory();
    this.validation();
    this.model_validation();
  }


  validation() {

    this.validatingForm = new FormGroup({
      categoryname: new FormControl(null, Validators.required),
      newcategoryname: new FormControl(null, Validators.required),
    });
  }


  model_validation() {
    this.validatingFormModel = new FormGroup({
      newcategoryname: new FormControl(null, Validators.required)
    })
  }

  // GetProfileDetail(registrationid) {
  //   this.getservice.GetProfileData_AddDepartment(registrationid).subscribe(res => {
  //     this.userdetail = res;
  //   },
  //     error => alert(error),
  //     () => console.log('Finished')
  //   );
  // }

  // GetEmployeeProfileData() {
  //   this.getservice.GetAllEmployeeProfileData().subscribe(
  //     (data: any) => {
  //       if (data.result.length > 0) {
  //         this.categoryUserDetail = data.result;
  //       }
  //       else {
  //         this.categoryUserDetail = [];
  //       }
  //     });
  // }

  GetCategory() {

    this.getservice.GetFileCategory_ForManageCategory().subscribe(res => {
      if (res.result.length > 0) {
        this.categorydetail = res.result;
        $('#dept_details').dataTable().fnDestroy();
        this.dataTable();
        this.showLoader=false;
      }
      else {
      
        this.categorydetail = [];
        this.showLoader=false;
      }
    });

  }

  AddCategory() {
    if (this.validatingFormModel.invalid) {
      this.validatingFormModel.controls['newcategoryname'].markAsTouched();
    }
    else {
      this.postservice.AddCategory(this.addCategoryData).subscribe(res => {
        if (res.result.length > 0) {

          if (res.result == '1') {
            Swal.fire({
              type: 'success',
              text: 'Category name added successfully.',
              showConfirmButton: false,
              timer: 2000,
            });

            $("#myModal").modal("hide");
            this.GetCategory();
            this.validatingFormModel.reset();

          }
          else if (res.result == '3') {
            Swal.fire({
              type: 'error',
              text: 'Category name already exist.',
              showConfirmButton: false,
              timer: 2000,
            });
          }

        }
      });
    }
  }




  UpdateCategory() {

    if (this.validatingForm.invalid) {
      this.validatingForm.controls['newdepartmentname'].markAsTouched();
      //this.validatingForm.controls['departmentshortname'].markAsTouched();
    }
    else {

      this.postservice.updateCategory(this.category).subscribe(
        (data: any) => {
          if (data.result == '1') {
            Swal.fire({
              type: 'success',
              text: 'Category updated successfully.',
              showConfirmButton: false,
              timer: 2000,
            });

            $("#myModal2").modal("hide");
            this.GetCategory();
            this.validatingForm.reset();

          }
          else if (data.result == '3') {
            Swal.fire({
              type: 'error',
              text: 'Category name already exist.',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      )
    }
  }


  edit(category_id, category_name) {

    this.category.categoryname = category_name;
    this.category.categoryid = category_id;
  }

  delete(CategoryID, CategoryName) {

    Swal.fire({
      //title: 'Are you sure?',
      text: "Are you sure you want to delete " + "'" + CategoryName + "' category?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {

        this.getservice.DeleteCategory(CategoryID, CategoryName).subscribe((data: any) => {
          if (data.result == '3') {
            Swal.fire({
              type: 'error',
              text: "This category is already assigned to user's file. Before deleting, change the assigned file category.",
              showConfirmButton: false,
              timer: 3500,
            });
          }
          else if (data.result == '1') {
            Swal.fire({
              type: 'success',
              text: 'Category name deleted successfully.',
              showConfirmButton: false,
              timer: 2000,
            });
            this.GetCategory();
          }
        });
      }
    });

  }


  dataTable() {

    $(function () {

      var table = $('#dept_details').DataTable(
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
                //columns: ':visible',
                columns: [0, 1]
              }
            },
          ],

          columnDefs: [{
            targets: -1,
            visible: true
          }],

        }
      );

      table.buttons().container()
        .appendTo('#Department_Master .col-md-6:eq(0)');

    });
  }
}
