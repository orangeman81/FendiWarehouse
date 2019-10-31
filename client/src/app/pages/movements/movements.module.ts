import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { MatCardModule } from '@angular/material/card';
import { MovementsService } from 'src/app/providers/movements.service';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [MovementsComponent, ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    ComponentsModule,
    MatCardModule,
    MatPaginatorModule
  ],
  entryComponents: [
    DetailsComponent
  ],
  providers: [
    MovementsService
  ]
})
export class MovementsModule { }
