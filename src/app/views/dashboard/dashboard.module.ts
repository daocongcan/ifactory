import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthenticationService } from '../../authentication/authentication.service';
import {SelectModule} from 'ng2-select';

import { HomePageComponent } from './home-page/home-page.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { ProductsService } from '../../api/services/products.service';
import { ProductTypesService } from '../../api/services/product-types.service';
import { DeviceAttachmentService } from '../../api/services/device-attachment.service';
import { DevicesService } from '../../api/services/devices.service';
import { DeviceDataService } from '../../api/services/device-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { ProductStatusService } from '../../api/services/product-status.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CompaniesService, StoragesService, SitesService, UnitsService, FacturationsService } from '../../api/services';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { GwComponent } from './gw/gw.component';
import { NodeComponent } from './node/node.component';

import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './admin/list/list.component';

import { UserComponent } from './user/user.component';
import { ListuserComponent } from './user/listuser/listuser.component';

import { UsersService } from '../../api/services/users.service';
import { RolesService } from '../../api/services/roles.service';
import { NodeService } from '../../api/services/node.service';

import { RoleComponent } from './role/role.component';
import { ListroleComponent } from './role/listrole/listrole.component';

import { GroupsService } from '../../api/services/groups.service';
import { GwService } from '../../api/services/gw.service';

import { ListgroupComponent } from './group/listgroup/listgroup.component';
import { GroupComponent } from './group/group.component';
import { ListgwComponent } from './gw/listgw/listgw.component';
import { ListnodeComponent } from './node/listnode/listnode.component';




@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcL1uP1e6wUohluzq3Y818bCT5dbRYINU'
    }),
    AgmSnazzyInfoWindowModule,
    DashboardRoutingModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTabsModule,
    HttpClientModule,
    HttpModule,
    SelectModule
    ,
  ],
  providers: [
    AuthenticationService,
    ProductsService,
    ProductTypesService,
    DeviceAttachmentService,
    DevicesService,
    DeviceDataService,
    DashboardService,
    ProductStatusService,
    CompaniesService,
    StoragesService,
    
    NgbTooltipConfig,
    SitesService,
    UsersService,
    RolesService,
    UnitsService,
    FacturationsService,
    GroupsService,
    GwService,
    NodeService
    
  ],
  declarations: [
    HomePageComponent,
    GwComponent,
    NodeComponent,
    AdminComponent,
    ListComponent,
    UserComponent,
    ListuserComponent,
    RoleComponent,
    ListroleComponent,
    ListgroupComponent,
    GroupComponent,
    ListgwComponent,
    ListnodeComponent,
    
  ]
})
export class DashboardModule { }
