import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import {NgChartsModule, NgChartsConfiguration} from 'ng2-charts';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridAngular } from '@ag-grid-community/angular';
import { AgGridModule } from 'ag-grid-angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OwlModule } from 'ngx-owl-carousel';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';
import { ToastrModule } from 'ngx-toastr';
import { LanguageSelectorComponent } from './views/partials/layout/topbar/language-selector/language-selector.component';
import { AsideLeftComponent } from './admin/Base/aside-left/aside-left.component';
import {MatIconModule} from "@angular/material/icon";
import { BaseComponent } from './admin/Base/base/base.component';
import { HeaderComponent } from './admin/Base/header/header.component';
import { BreadcrumbComponent } from './admin/Base/breadcrumb/breadcrumb.component';
import { DashboardComponent } from './admin/Views/Pages/dashboard/dashboard.component';
import { RoleManagementComponent } from './admin/Views/Pages/role-management/role-management.component';
import { ActionRoleManagementComponent } from './admin/Views/Pages/role-management/action-role-management/action-role-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LanguageSelectorComponent,
    AsideLeftComponent,
    BaseComponent,
    HeaderComponent,
    BreadcrumbComponent,
    DashboardComponent,
    RoleManagementComponent,
    ActionRoleManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    NgChartsModule,
    ReactiveFormsModule,
    ChartModule,
    DropDownsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    NgSelectModule,
    AgGridModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 400000,
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule.forRoot(),
    OwlModule,
    MatTreeModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
