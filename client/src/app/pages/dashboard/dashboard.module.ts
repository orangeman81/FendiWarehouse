import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardResolver } from 'src/app/providers/resolvers/dashboardResolver';
import { AllertComponent } from 'src/app/components/allert/allert.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    MatTabsModule,
    NgxChartsModule
  ],
  entryComponents: [
    AllertComponent
  ],
  providers: [
    DashboardResolver
  ]
})
export class DashboardModule { }
