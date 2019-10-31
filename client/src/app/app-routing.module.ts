import { ErrorComponent } from './pages/error/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './providers/auth/auth.guard';
import { CallbackComponent } from './pages/callback/callback.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
    data: { animation: 'home' }
  },
  {
    path: "login",
    component: LoginComponent,
    data: { animation: 'login' }
  },
  {
    path: "callback",
    component: CallbackComponent,
    data: { animation: 'callback' }
  },
  {
    path: "dashboard",
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canLoad: [AuthGuard],
    data: { animation: 'dashboard' }
  },
  {
    path: "stores",
    loadChildren: () => import('./pages/stores/stores.module').then(mod => mod.StoresModule),
    canLoad: [AuthGuard],
    data: { animation: 'stores' }
  },
  {
    path: "warehouse",
    loadChildren: () => import('./pages/warehouse/warehouse.module').then(mod => mod.WarehouseModule),
    canLoad: [AuthGuard],
    data: { animation: 'warehouse' }
  },
  {
    path: "movements",
    loadChildren: () => import('./pages/movements/movements.module').then(mod => mod.MovementsModule),
    canLoad: [AuthGuard],
    data: { animation: 'movements' }
  },
  {
    path: "error",
    component: ErrorComponent,
    canActivate: [AuthGuard],
    data: {animation: 'error'}
  },
  {
    path: "**",
    redirectTo: "error"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
