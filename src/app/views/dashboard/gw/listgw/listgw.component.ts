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



import { GwService } from '../../../../api/services/gw.service';
import { Gw } from '../../../../api/models/gw';

import { Locale } from '../../../../locale';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-listgw',
  templateUrl: './listgw.component.html',
  styleUrls: ['./listgw.component.css']
})
export class ListgwComponent implements OnInit {

  public gw: Gw = new Gw();
  public updateGw: Gw = new Gw();
  public editGw: Gw;
  public gws: Gw[] = [];
  public keySearch:string ="";
  allIdChecked = [];

  constructor(
    private router: Router,
    private apigwService: GwService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,
  ) { }

  ngOnInit() {
    this.renderView();
  }

  renderView(){
    this.getAllGw();
  };

  getAllGw() {
    
    this.apigwService.listGw().subscribe(
      data => {
        this.gws = data;
        console.log(this.gws);
        // console.log(this.companies);
        data.forEach(e => {
         
          
        });
        
      }
    );
  }

  getUpdateGw( updateGw: Gw){
    this.updateGw = {
      _id: updateGw._id,
      name_gw: updateGw.name_gw,
      IP_public: updateGw.IP_public,
      MAC_add: updateGw.MAC_add,
      OS: updateGw.OS,
    };
    
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

  deleteAll(){
    if(this.allIdChecked.length>0 ) {
      if(confirm("Are you sure delete")){
        for (let index = 0; index < this.allIdChecked.length; index++) {
          this.apigwService.deleteGw(this.allIdChecked[index]).subscribe(
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

  public filterItems(query) {
    return this.gws.filter(function(el) {
        return el.name_gw.toLowerCase().indexOf(query.toLowerCase())  > -1;
    })
    
  }

  public seachName (){

    this.apigwService.listGw().subscribe(
      data => {
        this.gws = data;
        this.gws = (this.filterItems(this.keySearch));
      }
    );
  }

  save() {
    
    if (this.updateGw._id == undefined ||  this.gw._id <1 ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter id", 1500);
    }

    else if (this.updateGw.name_gw == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter name gw", 1500);
    }

    else if (this.updateGw.IP_public == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter ip gw", 1500);
    }
    else if (this.updateGw.MAC_add == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter mac add", 1500);
    }
    else if (this.updateGw.OS == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
   
    
    else {
      console.log(this.gw);
      this.apigwService.updateGw(this.updateGw)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, "Add gw success", 1500);
            this.renderView();
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Error", 1500);
          }
        );
    }
  }



}
