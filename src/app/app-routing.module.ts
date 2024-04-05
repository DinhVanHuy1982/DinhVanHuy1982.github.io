import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./admin/Views/Pages/dashboard/dashboard.component";
import {RoleManagementComponent} from "./admin/Views/Pages/role-management/role-management.component";
import {HomePageComponent} from "./viewsShare/Views/home-page/home-page.component";

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path:"role-managemment",component:RoleManagementComponent},
  {path: "home-page",component: HomePageComponent},
  {path: "**", component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
