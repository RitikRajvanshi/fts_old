import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as myGlobals from '../../globalvar';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  ftpaddress= myGlobals.ftpaddress1;
  url:any;

  constructor(public router: Router) { }

  ngOnInit() {
    // this.url = this.ftpaddress + '/TipsPdf/tips';
  }

}
