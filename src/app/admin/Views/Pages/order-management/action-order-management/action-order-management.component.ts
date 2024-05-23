import { Component } from '@angular/core';
import {ITooltipAngularComp} from "ag-grid-angular";
import {ITooltipParams} from "ag-grid-community";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateUpdateBrandComponent} from "../../brand-management/create-update-brand/create-update-brand.component";
import {OrderManagementComponent} from "../order-management.component";
import {OrderDetailComponent} from "../order-detail/order-detail.component";
import {UserService} from "../../../../../viewsShare/Views/user.service";

@Component({
  selector: 'app-action-order-management',
  templateUrl: './action-order-management.component.html',
  styleUrls: ['./action-order-management.component.scss']
})
export class ActionOrderManagementComponent  implements ITooltipAngularComp{
  data:any;
  action:any;
  constructor( private toast:ToastrService,
               public matdialog: MatDialog,
               private orderManagement:OrderManagementComponent,
               private userService:UserService)
  {
    this.userService.getAction().subscribe((res:any)=>{
      this.action = res;
    })
  }

  agInit(params: ITooltipParams): void {
    this.data = params.data;
  }


  updateOrder() {
    const dialogConfig= {
      height: '80vh',
      width: '50vw',
      maxHeight: '90vh',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true,
      data: this.data
    };
    this.matdialog.open(OrderDetailComponent, dialogConfig).afterClosed().subscribe((data:any)=>{
      this.orderManagement.search();
    })
  }
}
