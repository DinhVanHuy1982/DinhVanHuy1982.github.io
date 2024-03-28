import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./admin/Views/Pages/dashboard/dashboard.component";
import {RoleManagementComponent} from "./admin/Views/Pages/role-management/role-management.component";

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path:"role-managemment",component:RoleManagementComponent},
  {path: "**", component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
