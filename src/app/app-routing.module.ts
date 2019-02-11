import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';


const APP_ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-new', component: VehicleAddComponent },
  { path: 'detail/:id', component: VehicleDetailComponent },
  { path: 'list', component: VehicleListComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
