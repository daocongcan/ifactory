import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../dashboard.service';

import * as $ from 'jquery';
import { Directive } from '@angular/core/src/metadata/directives';

import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/common.service';
import { CompaniesService } from '../../../../api/services/companies.service';
import { Company } from '../../../../api/models/company';


import { Locale } from '../../../../locale';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public company: Company = new Company();
  public updateCompany: Company = new Company();
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
    this.renderView()
    
  }
  renderView() {
    this.getAllCompanies();
  }

  getUpdateCompany(editCompany: Company){
    
    this.updateCompany = {
      _id: editCompany._id,
      name_company: editCompany.name_company,
      address: editCompany.address,
      tax_number: editCompany.tax_number,
      phone: editCompany.phone
    };
  };

  

  deleteCompany(companyId){
    if(confirm("Are you sure to delete")) {

      this.apiCompanyService.deleteCompany(companyId)
      .subscribe(
        response => {
          this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.ADD_NEW_PRODUCT_SUCCESSFULLY, 1500);
          $('#closeModal').click();
          this.renderView();
        },
        err => {
          this.commonService.notifyError(this.locale.SORRY, this.locale.ADD_NEW_PRODUCT_FAILED, 1500);
        }
      );
      
    }
    
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

  searchCompany(){
    if((document.getElementById('search') as HTMLInputElement).value === ''){
      this.commonService.notifyError(this.locale.SORRY, "Enter name company", 1500);
    }else {
    let  key = (document.getElementById('search') as HTMLInputElement).value;
      this.apiCompanyService.searchCompanyResponse(key)
        .subscribe(
          data => {
            // console.log(data.body);
            this.companies = data.body;
            // this.companies = data;
            // this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.ADD_NEW_PRODUCT_SUCCESSFULLY, 1500);
            // $('#closeModal').click();
            // this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Data error", 1500);
          }
        );   
    }
  }

  saveCompany(){
    if ((document.getElementById('name_company') as HTMLInputElement).value === '') {
      this.commonService.notifyError(this.locale.SORRY, this.locale.NAME_IS_REQUIRED, 1500);
    } 
    // else if ((document.getElementById('_id') as HTMLInputElement).value === '') {
    //   this.commonService.notifyError(this.locale.SORRY, this.locale.DATE_IS_REQUIRED, 1500);
    // } 
    else if ((document.getElementById('address') as HTMLInputElement).value === '') {
      this.commonService.notifyError(this.locale.SORRY, this.locale.PRICE_IS_REQUIRED, 1500);
    } else if ((document.getElementById('tax_number') as HTMLInputElement).value === '') {
      this.commonService.notifyError(this.locale.SORRY, this.locale.DATE_IS_REQUIRED, 1500);
    } else if ((document.getElementById('phone') as HTMLInputElement).value === '') {
      this.commonService.notifyError(this.locale.SORRY, this.locale.DATE_IS_REQUIRED, 1500);
    } else {
      // console.log(this.updateCompany);
      this.apiCompanyService.updateCompany(this.updateCompany)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, this.locale.ADD_NEW_PRODUCT_SUCCESSFULLY, 1500);
            $('#closeModal').click();
            this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, this.locale.ADD_NEW_PRODUCT_FAILED, 1500);
          }
        );
    }

  }

}
