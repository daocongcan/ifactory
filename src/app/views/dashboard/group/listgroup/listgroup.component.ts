import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener, PipeTransform, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';
// import { Pipe } from '@angular/core';
// import { PipeTransform } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/common.service';

import { CompaniesService } from '../../../../api/services/companies.service';
import { Company } from '../../../../api/models/company';

import { GroupsService } from '../../../../api/services/groups.service';
import { Group } from '../../../../api/models/group';

import { Locale } from '../../../../locale';
import { SelectComponent } from 'ng2-select';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-listgroup',
  templateUrl: './listgroup.component.html',
  styleUrls: ['./listgroup.component.css']
})
export class ListgroupComponent implements OnInit {

  public group:Group = new Group();

  public updateGroup: Group = new Group();
  public editGroup: Group;
  public groups: Group[] = [];
  public keySearch:string ="";
  
  companies: Company[] = [];

  public items:any = [] ;
  public itemGroups:any = [];
  selectCompany:number = 0;
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
  
  allIdChecked = [];
  delete = [];

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
  @ViewChild('search') ngSelect2: SelectComponent;

  renderView(){
    this.getAllGroup();
    this.getAllCompany();
  };

  getAllGroup() {
    this.apiGroupService.listGroups().subscribe(
      data => {
        this.groups = data;

        this.groups.forEach( e => {
          this.itemGroups.push( {"text":e.group_name,"id":e._id});
          // console.log(this.items);
          // this.items = e.name_company;
          // this.ngSelect2.items = this.itemGroups;
        });
      }
    );
  };


  getIdChecked(e,id){
    // console.log(e.target.checked);
    if (e.target.checked) {
      this.allIdChecked.push(id);
    }  else {
      this.allIdChecked.splice(this.allIdChecked.indexOf(id), 1);
    }
    // console.log(this.allIdChecked);
  }

  getAllCompany() {

    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;

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

  public selectedSearch(value:any):void {
    this.groups=[];
    
    this.apiGroupService.listGroups().subscribe(
      data => {
        data.forEach( e => {
            if(value.id == e._id){
              this.groups.push(e) ;
            }      
        });
      }
    );
  }

  deleteAll(){
    if(this.allIdChecked.length>0 ) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apiGroupService.deleteGroup(this.allIdChecked[index]).subscribe(
            response => {
              this.commonService.notifySuccess(this.locale.CONGRATULATION, "Delete Success", 1500);
              
              this.renderView();
              this.allIdChecked=[];
            },
            err => {
              this.commonService.notifyError(this.locale.SORRY, this.locale.ADD_NEW_PRODUCT_FAILED, 1500);
            }
          )
        }
      }
    }else {
      this.commonService.notifyError(this.locale.SORRY, "Selected user delete", 1500);
    }
  };

  getUpdateGroup( updateGroup: Group){
    this.updateGroup = {
      _id: updateGroup._id,
      group_name: updateGroup.group_name,
      id_company: updateGroup.id_company,
    };

    let activeGroup = [];
    
    // this.ngSelect.active =  { "id": updateGroup.id_company };
    
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          
          if(this.updateGroup.id_company == e._id){
            activeGroup.push({'text':e.name_company,"id":e._id});
            // console.log(this.activeCompany);
            this.ngSelect.active = activeGroup;
            this.selectCompany = e._id ;
            // this.co=e.name_company;
          }
        });
      }
    );
  };
  

  save() {
    console.log(this.updateGroup);
    if ( this.updateGroup.group_name === undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter group name", 1500);
    }
    else if( this.selectCompany === 0 || this.selectCompany === undefined 
      || this.selectCompany === null 
    ) {
      this.commonService.notifyError(this.locale.SORRY, "Select company", 1500);
    }
    else {
      // console.log(this.group);
      this.updateGroup.id_company = this.selectCompany;
      
      this.apiGroupService.updateGroup(this.updateGroup)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, "Update group success", 1500);
            this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Error", 1500);
          }
        );
    }
  }

  public filterItems(query) {
    return this.groups.filter(function(el) {
        return el.group_name.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
    
  }

  public seachName (){

    this.apiGroupService.listGroups().subscribe(
      data => {
        this.groups = data;
        this.groups = (this.filterItems(this.keySearch));
      }
    );
  }

  
  
  public selected(value:any):void {
    this.selectCompany = value.id;
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
