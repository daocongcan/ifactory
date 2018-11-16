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

import { UsersService } from '../../../api/services/users.service';
import { User } from '../../../api/models/user';

import { CompaniesService } from '../../../api/services/companies.service';
import { Company } from '../../../api/models/company';

import { RolesService } from '../../../api/services/roles.service';
import { Role } from '../../../api/models/role';

import { Locale } from '../../../locale';
import { SelectComponent } from 'ng2-select';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
export class UserComponent implements OnInit {

  public user: User = new User();
  public updateUser: User = new User();
  public editUser: User;
  
  users: User[] = [];
  roles: Role[] = [];
  companies: Company[] = [];
  encrypted = "";
  key="dfmsecret";

  public items:any = [] ;
  public items2:any = [] ;
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
  private co= "";
  private ro= "";
  
  constructor(
    private router: Router,
    private apiUserService: UsersService,
    private apiRoleService: RolesService,
    private apiCompanyService: CompaniesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
  ){ }

  @ViewChild('company') ngSelect: SelectComponent;
  @ViewChild('role') ngSelect2: SelectComponent;

  ngOnInit() {
    this.renderView();
    console.log(this.items);
  }

  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any):void {
    this.co = value.text;
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        
        data.forEach(e => {
          if(this.co === e.name_company) {
            this.user.id_company = e._id;
            // console.log(this.user.id_company);
          }
        });
      }
    );
    
  }
  public selected2(value:any):void {
    this.ro = value.text;

    this.apiRoleService.listRoles().subscribe(
      data => {
        this.roles = data;

        data.forEach(e => {
          // console.log(element.name_company);

          if(this.ro === e.role_name) {
            this.user.id_role = e._id;
          }
          
        });
        
      }
    );
    
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

  addNewUser() {
    this.user = new User();
    
  }

  renderView() {
    this.getAllRole();
    this.getAllCompany();
    // console.log(this.items);
    
  }

  getAllRole() {
    this.apiRoleService.listRoles().subscribe(
      data => {
        this.roles = data;

        data.forEach(e => {
          // console.log(element.name_company);

          if(this.ro === e.role_name) {
            this.user.id_role = e._id;
          }
          this.items2.push( e.role_name);
          // this.items = e.name_company;
          this.ngSelect2.items = this.items2;
          
        });
        
      }
    );
  }
  

  getAllCompany() {
    
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        
        data.forEach(e => {
          // console.log(element.name_company);
          if(this.co === e.name_company) {
            this.user.id_company = e._id;
          }
          
          this.items.push(e.name_company);
          // this.items = e.name_company;
          this.ngSelect.items = this.items;

          
          
        });
        
      }
    );
    
  }

  
  

  

  saveUser() {
    if (this.user._id < 1 || this.user._id === undefined  ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter ID", 1500);
    }
    else if( this.co === "" ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Company", 1500);
    }
    else if (this.user.name_user == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Username", 1500);
    } 
    else if (this.user.email == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Email", 1500);
    } else if ( this.user.password == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter password", 1500);
    } else if (this.ro === "" ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Role", 1500);
    }
    else {
      

      // console.log(this.user);
      this.encrypted = CryptoJS.AES.encrypt(this.user.password, this.key).toString();
      this.user.password = this.encrypted;
      
      this.apiUserService.createUser(this.user)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, "Add user success", 1500);
            this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Error", 1500);
          }
        );
    }
    
  }


}
