import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit {
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
  Userdata:any;
  validatingForm: FormGroup;
  GetFile:any;
  editfile={
    filename:'',
    file_id:'',
    file_notes:'',
    worked_by:'',
    returned_fileid:'',
    department_name:'',
    worked_by_username:'',
    department_id:''
  }
  departmentDetail:any;
  userdetail:any;

  constructor(private activatedRoute:ActivatedRoute, private getservice:GetServicesService, private postservice:PostServicesService) { }

  ngOnInit() {
    this.Userdata  = JSON.parse(sessionStorage.getItem('LoginStatus'));
    this.editfile.worked_by = this.Userdata.registrationid;
    this.validation();
    this.activatedRoute.queryParams.subscribe(params => {
      this.editfile.file_id=params['file_id'];
    }); 
 this.Getfiles();
   

  }


  validation() {
   this.validatingForm = new FormGroup({
     
      filename: new FormControl(null, Validators.required),
  
      file_notes: new FormControl(null, Validators.required),
    
    });
  }


  Getfiles(){
    this.getservice.GetFileByFileId(this.editfile.file_id).subscribe(res => {
     this.GetFile = res.result;
    this.editfile.filename = this.GetFile[0].filename;
    this.GetProfileDetail();

     },
       error => alert(error),
       () => console.log('Finished')
     );
   
   }


   GetProfileDetail(){
  
    this.getservice.GetProfileData_EditFile( this.Userdata.registrationid).subscribe(res => {
      this.userdetail = res;
      this.editfile.department_name = this.userdetail[0].departmentname;
      this.editfile.department_id = this.userdetail[0].department;
      this.editfile.worked_by_username = this.userdetail[0].first_name+' '+this.userdetail[0].last_name;
      console.log('departmenet detail',this.userdetail);
      // this.username=this.userdetail[0].first_name;
      // this.department=this.userdetail[0].departmentname;
      // console.log('department',this.userdetail);
      //this.getDepartmentname();
    
    },
      error => alert(error),
      () => console.log('Finished')
    );
  
  }

  // getDepartmentname(){
  //   this.getservice.getDepartmentName(this.userdetail[0].department).subscribe(res => {
  //     this.departmentDetail=res.result;
  //     console.log('departmenet detail',this.departmentDetail);
  //   });
  // }





  SubmitNoting(){
    if(this.validatingForm.invalid){

      this.validatingForm.controls['filename'].markAsTouched(),
    
      this.validatingForm.controls['file_noting'].markAsTouched()
    }
    else{

      // this.postservice.FileWork(this.editfile).subscribe(res => {
      // if(res.status== true){
      //   this.editfile.returned_fileid=res.result[0].id;
      //   Swal.fire({
      //     type: 'success',
      //     text: 'Notes saved successfully.',
      //     showConfirmButton: false,
      //     timer: 2000
      //   })
      // }
        
   
      //   },
      //     error => alert(error),
      //     () => console.log('Finished')
      //   );
      
  
    }
  }



}
