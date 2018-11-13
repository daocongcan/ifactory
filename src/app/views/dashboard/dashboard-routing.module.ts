import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {HomePageComponent} from './home-page/home-page.component';
import {GwComponent} from './gw/gw.component';
import {NodeComponent} from './node/node.component';

import {AdminComponent} from './admin/admin.component';
import {ListComponent} from './admin/list/list.component';

import {UserComponent} from './user/user.component';
import {ListuserComponent} from './user/listuser/listuser.component';




const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'gw',
    component: GwComponent
  },
  {
    path: 'node',
    component: NodeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/list',
    component: ListComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'user/list',
    component: ListuserComponent
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
