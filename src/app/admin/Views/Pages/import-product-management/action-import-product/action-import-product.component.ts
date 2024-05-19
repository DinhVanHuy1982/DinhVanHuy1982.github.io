import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProductService} from "../../product-management/product.service";
import {
  CreateUpdateProductComponent
} from "../../product-management/create-update-product/create-update-product.component";
import {ITooltipParams} from "ag-grid-community";
import {ITooltipAngularComp} from "ag-grid-angular";
import {CreateImportProductComponent} from "../create-import-product/create-import-product.component";

@Component({
  selector: 'app-action-import-product',
  templateUrl: './action-import-product.component.html',
  styleUrls: ['./action-import-product.component.scss']
})
export class ActionImportProductComponent implements ITooltipAngularComp{

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
      height: '80vh',
      width: '60vw',
      maxHeight: '90vh',
      maxWidth: '90vw',
      data: {
        isCreate: false,
        itemData: this.data
      }
    };
    this.matdialog.open(CreateImportProductComponent, dialogConfig).afterClosed().subscribe((data:any)=>
      {}
    )
  }
  deleteProduct(){

  }

  agInit(params: ITooltipParams): void {
    this.data=params.data;
  }
}
