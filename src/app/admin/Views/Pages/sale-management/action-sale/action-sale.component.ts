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
import {UserService} from "../../../../../viewsShare/Views/user.service";

@Component({
  selector: 'app-action-sale',
  templateUrl: './action-sale.component.html',
  styleUrls: ['./action-sale.component.scss']
})
export class ActionSaleComponent implements ITooltipAngularComp{
  disableDelete=false;
  action:any;
  constructor(
    private toast:ToastrService,
    public matdialog: MatDialog,
    private productService: ProductService,
    private saleComponent:SaleManagementComponent,
  private userService:UserService
  ) {
    this.userService.getAction().subscribe((res:any)=>{
      this.action = res;
    })
  }
  data: any;

  openModal(template:any){
    const dialogConfig= {
      disableClose: false,
      hasBackdrop: true,
      width: '450px',
      borderRadius:'10px'
    };
    this.matdialog.open(template,dialogConfig)
  }
  updateProduct(){
    const dialogConfig: MatDialogConfig<{ isCreate: boolean;itemData: any }> = {
      disableClose: false,
      hasBackdrop: true,
      width: '760px',
      height: '600px',
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
