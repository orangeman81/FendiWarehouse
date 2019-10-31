import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './stores.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { StoresFormComponent } from './stores-form/stores-form.component';
import { StoresService } from 'src/app/providers/stores.service';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoresResolver } from 'src/app/providers/resolvers/storesResolver';
import { AllertComponent } from 'src/app/components/allert/allert.component';


@NgModule({
  declarations: [StoresComponent, ListComponent, DetailsComponent, StoresFormComponent],
  imports: [
    CommonModule,
    StoresRoutingModule,
    ComponentsModule,
    MatCardModule,
    MatPaginatorModule
  ],
  entryComponents: [
    AllertComponent,
    StoresFormComponent
  ],
  providers: [
    StoresResolver,
    StoresService
  ]
})
export class StoresModule { }
