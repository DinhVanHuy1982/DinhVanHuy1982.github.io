import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProductService} from "../../product-management/product.service";
import {
  CreateUpdateProductComponent
} from "../../product-management/create-update-product/create-update-product.component";
import {ITooltipParams} from "ag-grid-community";
import {ITooltipAngularComp} from "ag-grid-angular";
import {CreateUpdateSaleComponent} from "../create-update-sale/create-update-sale.component";
import {SaleManagementComponent} from "../sale-management.component";

@Component({
  selector: 'app-action-sale',
  templateUrl: './action-sale.component.html',
  styleUrls: ['./action-sale.component.scss']
})
export class ActionSaleComponent implements ITooltipAngularComp{
  disableDelete=false;
  constructor(
    private toast:ToastrService,
    public matdialog: MatDialog,
    private productService: ProductService,
    private saleComponent:SaleManagementComponent
  ) {
  }
  data: any;

  openModal(template:any){

  }
  updateProduct(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean;itemData: any }> = {
      height: '60vh',
      maxHeight: '90vh',
      maxWidth: '90vw',
      data: {
        isCreate: false,
        itemData: this.data
      }
    };
    this.matdialog.open(CreateUpdateSaleComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {this.saleComponent.search()}
    )
  }
  deleteProduct(){

  }

  agInit(params: ITooltipParams): void {
    this.data=params.data;
  }
}
