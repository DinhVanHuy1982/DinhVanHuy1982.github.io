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
import {SearchPageComponent} from "./viewsShare/Views/search-page/search-page.component";
import {UserManagementComponent} from "./admin/Views/Pages/user-management/user-management.component";
import {BannerManagementComponent} from "./admin/Views/Pages/banner-management/banner-management.component";
import {
  ImportProductManagementComponent
} from "./admin/Views/Pages/import-product-management/import-product-management.component";
import {MyAccountComponent} from "./viewsShare/Views/my-account/my-account.component";
import {ChangePasswordComponent} from "./viewsShare/Views/change-password/change-password.component";

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
  {path: "search-page-product", component: SearchPageComponent},
  {path: "user-management", component: UserManagementComponent},
  {path: "banner-management", component: BannerManagementComponent},
  {path: "import-product-management", component: ImportProductManagementComponent},
  {path: "my-account", component: MyAccountComponent},
  {path: "change-pass-account", component: ChangePasswordComponent},
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
