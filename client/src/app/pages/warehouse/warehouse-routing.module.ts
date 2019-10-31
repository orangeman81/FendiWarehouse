import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { WarehouseComponent } from './warehouse.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { whResolver } from 'src/app/providers/resolvers/whResolver';
import { AssignmentComponent } from './assignment/assignment.component';


const routes: Routes = [
  {
    path: "",
    component: WarehouseComponent,
    children: [
      {
        path: "",
        component: ListComponent,
        data: { childanimation: 'list' }  
      },
      {
        path: "details/:id",
        component: DetailsComponent,
        data: { childanimation: 'details' },
        resolve: {
          details: whResolver
        }
      },
      {
        path: "assign",
        component: AssignmentComponent,
        data: { childanimation: 'assign' } 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
