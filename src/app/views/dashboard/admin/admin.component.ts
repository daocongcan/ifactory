import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../dashboard.service';

import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';

import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../shared/common.service';
import { CompaniesService } from '../../../api/services/companies.service';
import { Company } from '../../../api/models/company';


import { Locale } from '../../../locale';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public company: Company = new Company();
  public updateCompany: Company = new Company();
  isCreateCompany: Boolean = true;
  public editCompany: Company;
  
  companies: Company[] = [];
  
  constructor(
    private router: Router,
    private apiCompanyService: CompaniesService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
    private dashboardService: DashboardService,
  ){ }

  ngOnInit() {
    this.renderView();
  }

  addnewCompany() {
    this.company = new Company();
    this.isCreateCompany = true;
  }

  getUpdateCompany(editCompany: Company){
    this.updateCompany = {
      name_company: editCompany.name_company,
      address: editCompany.address,
      tax_number: editCompany.tax_number,
      phone: editCompany.phone
    };
    this.isCreateCompany = false;
  };

  getAllCompanies(){
    this.apiCompanyService.listCompanies().subscribe(
      data => {
        this.companies = data;
        this.companies.forEach(company => {
          // console.log(company);

        });
      }
    );
  };

  

  renderView() {
    this.getAllCompanies();
  }

  saveCompany() {
    
    if (this.company._id < 1 || this.company._id == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Id", 1500);
    } 
    else if (this.company.name_company == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Name", 1500);
    } 
    else if ( this.company.address == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Address", 1500);
    } else if ( this.company.tax_number == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Tax Number", 1500);
    } else if ( this.company.phone == undefined ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter Phone", 1500);
    } else {
      
      // console.log(this.company);
      this.apiCompanyService.createCompany(this.company)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.ADD_NEW_PRODUCT_SUCCESSFULLY, 1500);
            
            this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.ADD_NEW_PRODUCT_FAILED, 1500);
          }
        );
    }
    
  }

}
