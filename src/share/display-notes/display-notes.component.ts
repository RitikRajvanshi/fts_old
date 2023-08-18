import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2'

declare const $;

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  allNotesList: any;
  isloggedInUser: any;

  constructor(private router: Router, private auth: LoginService) { }



  ngOnInit() {

    this.isloggedInUser = JSON.parse(sessionStorage.getItem('LoginStatus'));
    console.log('thi si ', this.isloggedInUser.registrationid);
    this.getAllNotes(this.isloggedInUser.registrationid);

  }


  getAllNotes(userid) {
    this.auth.getAllNotes(userid).subscribe(
      (data: any) => {
        if (data.status == true) {

          this.allNotesList = data.result;
          $('#TblDatatable').dataTable().fnDestroy();
          this.dataTable();

        }
        else {

        }


      });
  }

  redirect() {
    // if (this.isloggedInUser.Role == 2) {
    //   this.router.navigate(['/user/welcome/add-notes']);
    // }
    // else if (this.isloggedInUser.Role == 3) {
    //   this.router.navigate(['/hod/welcome/add-notes']);
    // }

    this.router.navigate(['/user/welcome/add-notes']);

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
                columns: ':visible'
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
