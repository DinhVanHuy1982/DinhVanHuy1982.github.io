import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../product.service";
import {ITooltipAngularComp} from "ag-grid-angular";
import {ITooltipParams} from "ag-grid-community";
import {CreateUpdateRoleComponent} from "../../role-management/create-update-role/create-update-role.component";
import {CreateUpdateProductComponent} from "../create-update-product/create-update-product.component";

@Component({
  selector: 'app-action-product',
  templateUrl: './action-product.component.html',
  styleUrls: ['./action-product.component.scss']
})
export class ActionProductComponent implements ITooltipAngularComp{

  disableDelete=false;
  constructor(
    private toast:ToastrService,
    public matdialog: MatDialog,
    private productService: ProductService
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
    this.matdialog.open(CreateUpdateProductComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {}
    )
  }
  deleteProduct(){

  }

  agInit(params: ITooltipParams): void {
    this.data=params.data;
  }
}
