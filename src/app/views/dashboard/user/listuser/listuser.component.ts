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

import { UsersService } from '../../../../api/services/users.service';
import { User } from '../../../../api/models/user';

import { CompaniesService } from '../../../../api/services/companies.service';
import { Company } from '../../../../api/models/company';

import { RolesService } from '../../../../api/services/roles.service';
import { Role } from '../../../../api/models/role';

import { Locale } from '../../../../locale';
import { SelectComponent } from 'ng2-select';
import { NgClass } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  public user: User = new User();
  public updateUser: User = new User();
  public editUser: User;
  public users: User[] = [];
  public keySearch:string ="";
  
  roles: Role[] = [];
  companies: Company[] = [];
  allIdChecked = [];


  public items:any = [] ;
  public items2:any = [] ;
  public itemUsers:any = [] ;
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private co= "";
  private ro= "";

  activeCompany:Array<any>=[];
  activeRole:Array<any>=[];

  encrypted = "";
  decrypted ="";
  key="dfmsecret";

  constructor(
    private router: Router,
    private apiUserService: UsersService,
    private apiRoleService: RolesService,
    private apiCompanyService: CompaniesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
  ) { }

  ngOnInit() {
    this.renderView();
  }

  @ViewChild('company') ngSelect: SelectComponent;
  @ViewChild('role') ngSelect2: SelectComponent;
  @ViewChild('search') ngSelect3: SelectComponent;
  

  renderView(){
    this.getAllUser();
    this.getAllCompany();
    this.getAllRole();
    
    
    
  };

  getAllUser() {
    this.apiUserService.listUsers().subscribe(
      data => {
        this.users = data;

        this.users.forEach( e => {

          // console.log(element.name_company);
          this.itemUsers.push(e.name_user);

          // this.items = e.name_company;
          // this.ngSelect3.items = this.itemUsers;
        });
      }
    );
  };

  checkedID(id:number){
    this.allIdChecked.push(id);
   // console.log(this.allIdChecked);
  }

  getAllCompany() {

    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          // console.log(element.name_company);
          this.items.push(e.name_company);
          this.ngSelect.items = this.items;

        });
        
      }
    );
  }

  getAllRole(){
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
  };
  

  public selected(value:any):void {
    this.co = value.text;
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          if(this.co === e.name_company) {
            this.updateUser.id_company = e._id;
            // console.log(this.user.id_company);
          }
        });
      }
    );
  }


  public selectedSearch(value:any):void {
    let name = value.text;
    this.users=[];
    this.apiUserService.listUsers()
        .subscribe(
          data => {
            // console.log(data.body);
            data.forEach(e => {
              if(e.name_user == name){
                this.users.push(e);
              }              
            });
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Data error", 1500);
          }
        ); 
      // console.log(this.users);
  }


  public selected2(value:any):void {
    this.ro = value.text;
    
    this.apiRoleService.listRoles().subscribe(
      data => {
        this.roles = data;
        data.forEach(e => {
          // console.log(element.name_company);
          if(this.ro === e.role_name) {
            this.updateUser.id_role = e._id;
          }
        });
      }
    );
  }

  getIdChecked(e,id){
    if (e.target.checked) {
      this.allIdChecked.push(id);
    }  else {
      this.allIdChecked.splice(this.allIdChecked.indexOf(id), 1);
    }
    console.log(this.allIdChecked.length);
  }

  deleteAll(){
    console.log(this.allIdChecked);
    if(this.allIdChecked.length > 0 ) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apiUserService.deleteUser(this.allIdChecked[index]).subscribe(
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

  searchUser(){
    this.users=[];
    // console.log(this.keySearch);
    if( this.keySearch === undefined || this.keySearch === "" ){
      this.commonService.notifyError(this.locale.SORRY, "Please, Enter name", 1500);
      this.renderView();
    }else {
      
      this.apiUserService.listUsers()
        .subscribe(
          data => {
            // console.log(data.body);
            this.companies = data;
            data.forEach(e => {
              if(e.name_user == this.keySearch){
                this.users.push(e);
              }              
            });
            
            // this.companies = data;
            // this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.ADD_NEW_PRODUCT_SUCCESSFULLY, 1500);
            // $('#closeModal').click();
            
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Data error", 1500);
          }
        );   
    }
  }

  getUpdateUser( updateUser: User){
    this.updateUser = {
      _id: updateUser._id,
      name_user: updateUser.name_user,
      email: updateUser.email,
      password: updateUser.password,
      id_company: updateUser.id_company,
      id_role: updateUser.id_role
    };

    this.encrypted = CryptoJS.AES.encrypt(this.updateUser.password, this.key).toString();
    this.updateUser.password = this.encrypted;
    
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        data.forEach(e => {
          
          if(this.updateUser.id_company == e._id){
            this.activeCompany.push({'text':e.name_company,"id":e.name_company});
            // console.log(this.activeCompany);
            this.ngSelect.active = this.activeCompany;
            this.co=e.name_company;
          }

        });
        
      }
    );

    this.apiRoleService.listRoles().subscribe(
      data => {
        this.roles = data;
        data.forEach(e => {
          
          if(this.updateUser.id_role == e._id){
            this.activeRole.push({'text':e.role_name,"id":e.role_name});
            // console.log(this.activeRole);
            this.ro=e.role_name;
            this.ngSelect2.active = this.activeRole;
          }
         
        });
      }
    );

  };

  

  saveUser() {
    
    if( this.co === "" ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Company", 1500);
    }
    else if (this.updateUser.name_user == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Username", 1500);
    } 
    else if (this.updateUser.email == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Email", 1500);
    } else if ( this.updateUser.password == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter password", 1500);
    } else if (this.ro === "" ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Role", 1500);
    }
    else {
      // console.log(this.updateUser);
      
      this.apiUserService.updateUser(this.updateUser)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, "Add user success", 1500);
            $('#closeModal').click();
            this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Error", 1500);
          }
        );
    }
  }

  public filterItems(query) {
    return this.users.filter(function(el) {
        return el.name_user.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
    
  }

  public seachName (){
    console.log(this.keySearch);
    this.apiUserService.listUsers().subscribe(
      data => {
        this.users = data;
        this.users = (this.filterItems(this.keySearch));
        console.log(this.users);
      }
    );
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
