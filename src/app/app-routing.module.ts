import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./admin/Views/Pages/dashboard/dashboard.component";
import {RoleManagementComponent} from "./admin/Views/Pages/role-management/role-management.component";
import {HomePageComponent} from "./viewsShare/Views/home-page/home-page.component";
import {DetailProductComponent} from "./client/detail-product/detail-product.component";
import {AppComponent} from "./app.component";
import {ContentShopComponent} from "./viewsShare/Views/content-shop/content-shop.component";
import {CartComponent} from "./client/cart/cart.component";
import {UserService} from "./viewsShare/Views/user.service";
import {ProductManagementComponent} from "./admin/Views/Pages/product-management/product-management.component";
import {BrandManagementComponent} from "./admin/Views/Pages/brand-management/brand-management.component";
import {CategoriesManagementComponent} from "./admin/Views/Pages/categories-management/categories-management.component";
import {OrderManagementComponent} from "./admin/Views/Pages/order-management/order-management.component";
import {SaleManagementComponent} from "./admin/Views/Pages/sale-management/sale-management.component";

// const userLogin =

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "product-management", component: ProductManagementComponent},
  {path: "categories-management", component: CategoriesManagementComponent},
  {path: "order-management", component: OrderManagementComponent},
  {path: "brand-management", component: BrandManagementComponent},
  {path:"role-management",component:RoleManagementComponent},
  {path: "home-page",component: HomePageComponent},
  {path: "details", component:DetailProductComponent},
  {path:"h2shop/cart",component:CartComponent},
  {path:"sale-management",component:SaleManagementComponent},
  {path: "home-page-content", component: ContentShopComponent},
  {path: "**", component: ContentShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private userService:UserService) {
  }
}
