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

import { NodeService } from '../../../api/services/node.service';
import { Node } from '../../../api/models/node';


import { Locale } from '../../../locale';
import { NgClass } from '@angular/common';
import { noComponentFactoryError } from '@angular/core/src/linker/component_factory_resolver';

import { SelectComponent } from 'ng2-select';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  public node: Node = new Node();
  public nodes: Node[] = [];
  public items:any = [] ;

  @ViewChild('company') ngSelect: SelectComponent;

  constructor(
    private router: Router,
    private apiNodeService: NodeService,
    private commonService: CommonService,
    private modalService: BsModalService,
    private locale: Locale,

  ) { }


  ngOnInit() {

  }

  getAllNode() {

    this.apiNodeService.listNode().subscribe(
      data => {
        this.nodes = data;
        data.forEach(e => {
          // console.log(element.name_company);
          this.items.push(e.id_group);
          this.ngSelect.items = this.items;

        });
        
      }
    );
  }

  save() {
    
    if (this.node._id == undefined ||  this.node._id <1 ) {
      this.commonService.notifyError(this.locale.SORRY, "Enter id", 1500);
    }

    else if (this.node.name_node == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter name node", 1500);
    }

    else if (this.node.status == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter ip node", 1500);
    }
    else if (this.node.OS == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter mac add", 1500);
    }
    else if (this.node.dev_eui == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
    else if (this.node.app_eui == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
    else if (this.node.app_key == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
    else if (this.node.id_group == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
    else if (this.node.manufactuer == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
    else if (this.node.profile == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
    else if (this.node.codec == undefined) {
      this.commonService.notifyError(this.locale.SORRY, "Enter os", 1500);
    }
   
    
    else {
      console.log(this.node);
      this.apiNodeService.createNode(this.node)
        .subscribe(
          response => {
            this.commonService.notifySuccess(this.locale.CONGRATULATION, "Add node success", 1500);
            this.node = new Node ;  
          },
          err => {
            this.commonService.notifyError(this.locale.SORRY, "Error", 1500);
          }
        );
    }
  }


}
