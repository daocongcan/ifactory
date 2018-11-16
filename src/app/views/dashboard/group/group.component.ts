import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';
// import { Pipe } from '@angular/core';
// import { PipeTransform } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';

import { CompaniesService } from '../../../api/services/companies.service';
import { Company } from '../../../api/models/company';

import { GroupsService } from '../../../api/services/groups.service';
import { Group } from '../../../api/models/group';

import { Locale } from '../../../locale';
import { SelectComponent } from 'ng2-select';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  public group:Group = new Group();

  companies: Company[] = [];

  public items:any = [] ;
  selectCompany:number = 0;
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  constructor(
    private router: Router,
    private apiGroupService: GroupsService,
    private apiCompanyService: CompaniesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
  ) { }

  ngOnInit() {
    this.renderView();
  }

  @ViewChild('company') ngSelect: SelectComponent;

  renderView(){

    this.getAllCompany();
  };

  getAllCompany() {
    
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        // console.log(this.companies);
        data.forEach(e => {
          // console.log(e.name_company);
          this.items.push( {"text":e.name_company,"id":e._id});
          // console.log(this.items);
          // this.items = e.name_company;
          this.ngSelect.items = this.items;
          
        });
        
      }
    );
  }




  save() {
    
    if (this.group._id == undefined ||  this.group._id <1 ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter id", 1500);
    }

    else if (this.group.group_name == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter group name", 1500);
    }
    else if( this.selectCompany === 0 || this.selectCompany === undefined 
      || this.selectCompany === null 
    ) {
      this.commonService.notifyError(this.locale.SORRY, "Select company", 1500);
    }
    else {
      // console.log(this.group);
      this.group.id_company = this.selectCompany;
      
      this.apiGroupService.createGroup(this.group)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, "Add group success", 1500);
            
            this.group = new Group ;  
            this.ngSelect.active = null;
            this.selectCompany = null;
            
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Error", 1500);
          }
        );
    }
  }

  public selected(value:any):void {
    this.selectCompany = value.id;
    // console.log(value);

    // this.co = value.text;
    // this.apiCompanyService.listCompanies().subscribe(
    //   data => {
    //     this.companies = data;
    //     data.forEach(e => {
    //       if(this.co === e.name_company) {
    //         this.updateUser.id_company = e._id;
    //         // console.log(this.user.id_company);
    //       }
    //     });
    //   }
    // );
  }

  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public removed(value:any):void {
    // console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    // console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value;
  }


}
