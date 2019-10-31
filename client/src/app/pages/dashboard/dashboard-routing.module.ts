import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardResolver } from 'src/app/providers/resolvers/dashboardResolver';


const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    resolve: {
      count: DashboardResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
