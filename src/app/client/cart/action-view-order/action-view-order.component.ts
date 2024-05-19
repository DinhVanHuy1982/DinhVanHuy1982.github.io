import { Component } from '@angular/core';
import {ITooltipAngularComp} from "ag-grid-angular";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OrderManagementComponent} from "../../../admin/Views/Pages/order-management/order-management.component";
import {ITooltipParams} from "ag-grid-community";
import {OrderDetailComponent} from "../../../admin/Views/Pages/order-management/order-detail/order-detail.component";
import {CartComponent} from "../cart.component";
import {ViewOrderComponent} from "../view-order/view-order.component";

@Component({
  selector: 'app-action-view-order',
  templateUrl: './action-view-order.component.html',
  styleUrls: ['./action-view-order.component.scss']
})
export class ActionViewOrderComponent implements ITooltipAngularComp{
  data:any;
  constructor( private toast:ToastrService,
               public matdialog: MatDialog,
               private cartComponent:CartComponent)
  {

  }

  agInit(params: ITooltipParams): void {
    this.data = params.data;
  }


  updateOrder() {
    let complete=false;
    if(this.data.status==1 || this.data.status==0){
      complete=false
    }else{
      complete=true;
    }
    const dialogConfig:MatDialogConfig<{ isComplete: boolean;itemData: any }> = {
      height: '80vh',
      width: '50vw',
      maxHeight: '90vh',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isComplete:complete,
        itemData: this.data
      }
    };
    this.matdialog.open(ViewOrderComponent, dialogConfig).afterClosed().subscribe((data:any)=>{
      this.cartComponent.changeTab(this.data.tabSelected);
    })
  }

}
