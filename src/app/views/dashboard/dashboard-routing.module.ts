import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {HomePageComponent} from './home-page/home-page.component';

import {GwComponent} from './gw/gw.component';
import {ListgwComponent} from './gw/listgw/listgw.component';

import {NodeComponent} from './node/node.component';
import {ListnodeComponent} from './node/listnode/listnode.component';

import {AdminComponent} from './admin/admin.component';
import {ListComponent} from './admin/list/list.component';

import {UserComponent} from './user/user.component';
import {ListuserComponent} from './user/listuser/listuser.component';

import {RoleComponent} from './role/role.component';
import {ListroleComponent} from './role/listrole/listrole.component';

import {ListgroupComponent} from './group/listgroup/listgroup.component';
import {GroupComponent} from './group/group.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'gw/add',
    component: GwComponent
  },
  {
    path: 'gw',
    component: ListgwComponent
  },
  {
    path: 'gw/add',
    component: GwComponent
  },
  {
    path: 'node/add',
    component: NodeComponent
  },
  {
    path: 'node',
    component: ListnodeComponent
  },
  {
    path: 'admin/add',
    component: AdminComponent
  },
  {
    path: 'admin',
    component: ListComponent
  },
  {
    path: 'user/add',
    component: UserComponent
  },
  {
    path: 'user',
    component: ListuserComponent
  },
  {
    path: 'role',
    component: ListroleComponent
  },
  // {
  //   path: 'role/add',
  //   component: RoleComponent
  // },
  {
    path: 'group',
    component: ListgroupComponent
  },
  {
    path: 'group/add',
    component: GroupComponent
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
