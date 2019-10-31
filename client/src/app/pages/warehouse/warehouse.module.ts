import { WarehouseService } from './../../providers/warehouse.service';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { WhFormComponent } from './wh-form/wh-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { whResolver } from 'src/app/providers/resolvers/whResolver';
import { MatCardModule } from '@angular/material/card';
import { AllertComponent } from 'src/app/components/allert/allert.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AssignmentComponent } from './assignment/assignment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WarehouseComponent,
    ListComponent,
    DetailsComponent,
    WhFormComponent,
    AssignmentComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    ComponentsModule,
    FormsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatCardModule,
    MatStepperModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    AllertComponent,
    WhFormComponent
  ],
  providers: [
    whResolver,
    WarehouseService
  ]
})
export class WarehouseModule { }
