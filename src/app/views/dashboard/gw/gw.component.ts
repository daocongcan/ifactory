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



import { GwService } from '../../../api/services/gw.service';
import { Gw } from '../../../api/models/gw';

import { Locale } from '../../../locale';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-gw',
  templateUrl: './gw.component.html',
  styleUrls: ['./gw.component.scss']
})
export class GwComponent implements OnInit {

  public gw: Gw = new Gw();

  constructor(
    private router: Router,
    private apigwService: GwService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,

  ) { }


  ngOnInit() {

  }

  save() {
    
    if (this.gw._id == undefined ||  this.gw._id <1 ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter id", 1500);
    }

    else if (this.gw.name_gw == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter name gw", 1500);
    }

    else if (this.gw.IP_public == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter ip gw", 1500);
    }
    else if (this.gw.MAC_add == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter mac add", 1500);
    }
    else if (this.gw.OS == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
   
    
    else {
      console.log(this.gw);
      this.apigwService.createGw(this.gw)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, "Add gw success", 1500);
            this.gw = new Gw ;  
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Error", 1500);
          }
        );
    }
  }

  

  




}
