import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { MovementsComponent } from './movements.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    component: MovementsComponent,
    children: [
      {
        path: "",
        component: ListComponent 
      },
      {
        path: ":id",
        component: DetailsComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRoutingModule { }
