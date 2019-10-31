import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { StoresComponent } from './stores.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresResolver } from 'src/app/providers/resolvers/storesResolver';


const routes: Routes = [
  {
    path: "",
    component: StoresComponent,
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
          details: StoresResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
