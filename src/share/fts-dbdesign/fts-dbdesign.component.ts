import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { PostServicesService } from 'src/app/services/post-services.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-fts-dbdesign',
  templateUrl: './fts-dbdesign.component.html',
  styleUrls: ['./fts-dbdesign.component.scss']
})
export class FtsDbdesignComponent implements OnInit {

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private postservice: PostServicesService, private getservice: GetServicesService) { }
  table_name:any;
  TableNameforIndex:any;
  table_columnData:any;
  HeaderName:any;
  tbl_name:any;
  ngOnInit() {

    this.getTableNameData()
  }


  getTableNameData()
  {
    this.getservice.tableName().subscribe(res => {
      this.table_name = res.result;
      this.tbl_name = this.table_name[0].txt_table_name;
      this.getTableDataByTableName(this.table_name[0].txt_table_name)
    })
  }

  getTableDataByTableName(tablename)
  {
    this.getservice.getTableDataByTableName(tablename).subscribe(res => {
      this.table_columnData = res;
      this.HeaderName = Object.keys(this.table_columnData[0]);
    })
  }


  selectchangeforTableNamw(args) {
    this.TableNameforIndex = this.table_name[args.target.selectedIndex].txt_table_name;  
    this.getTableDataByTableName(this.TableNameforIndex);
  }

}
