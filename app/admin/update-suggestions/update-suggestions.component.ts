import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';

@Component({
  selector: 'app-update-suggestions',
  templateUrl: './update-suggestions.component.html',
  styleUrls: ['./update-suggestions.component.scss']
})
export class UpdateSuggestionsComponent implements OnInit {

  constructor(private getservice: GetServicesService, private postservice: PostServicesService) { }

  suggestionids = [];
  suggestionIdBasedData = [];
  validatingForm: any;
  suggestionData = {
    id: '',
    suggestion: '',
    status: '',
    actiontaken: '',
    created_by_name:'',
    created_date:''
  }

  ngOnInit() {
    this.validation();
    this.getSuggestionID();
  }

  validation() {

    this.validatingForm = new FormGroup({
      suggestion: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      actiontaken: new FormControl(null, Validators.required),
      suggestedby: new FormControl(),
      //suggestiondate: new FormControl(),
    });
  }

  getSuggestionID() {
    this.getservice.getSuggestionID().subscribe(res => {
      if (res.result.length > 0) {
        this.suggestionids = res.result;
        var obj = {
          id: '--Select Suggestion Id--',
        }
        this.suggestionids.splice(0, 0, obj);
        this.suggestionData.id = this.suggestionids[0].id;
        //this.getSuggestionData_IdBased(this.suggestionData.id);
      }
    });

  }

  selectSuggestionsId(args) {
    this.suggestionData.id = this.suggestionids[args.target.selectedIndex].id;
    if (this.suggestionData.id == '--Select Suggestion Id--') {
      this.validatingForm.reset();
      this.suggestionData.suggestion = '';
    }
    else {
      this.getSuggestionData_IdBased(this.suggestionData.id);
    }
  }


  getSuggestionData_IdBased(id) {
    this.getservice.getSuggestionDataIdBased(id).subscribe(res => {
      if (res.result.length > 0) {
        this.suggestionIdBasedData = res.result;
        this.suggestionData.suggestion = res.result[0].notes_description;
        this.suggestionData.status = res.result[0].status;
        this.suggestionData.actiontaken = res.result[0].actiontaken;
        this.suggestionData.created_by_name = res.result[0].created_by_name;
        this.suggestionData.created_date = res.result[0].created_date;
      }
    });
  }

  UpdateSuggestion() {
    if (this.suggestionData.id == '--Select Suggestion Id--') {
      Swal.fire({
        type: 'error',
        text: 'Please Select Suggestion Id.',
        showConfirmButton: false,
        timer: 2000,
      });
    }
    else {
      this.postservice.UpdateSuggestion_IdBased(this.suggestionData).subscribe(res => {
        if (res.status == true) {
          Swal.fire({
            type: 'success',
            text: 'Suggestion Updated Successfully.',
            showConfirmButton: false,
            timer: 2000,
          });
          this.validatingForm.reset();
          this.suggestionData.suggestion = '';
          this.getSuggestionID();
        }
      })
    }
  }

}
