import { Component } from '@angular/core';
import {ITooltipAngularComp} from "ag-grid-angular";
import {ITooltipParams} from "ag-grid-community";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProductService} from "../../product-management/product.service";
import {CreateUpdateBrandComponent} from "../create-update-brand/create-update-brand.component";
import {BrandManagementComponent} from "../brand-management.component";

@Component({
  selector: 'app-action-brand-management',
  templateUrl: './action-brand-management.component.html',
  styleUrls: ['./action-brand-management.component.scss']
})
export class ActionBrandManagementComponent implements ITooltipAngularComp{
  data:any

  disableDelete=false;
  constructor(
    private toast:ToastrService,
    public matdialog: MatDialog,
    private productService: ProductService,
    private brandComponent: BrandManagementComponent
  ) {
  }
  agInit(params: ITooltipParams): void {
    this.data=params.data;
  }
  updateBrand() {
    const dialogConfig: MatDialogConfig<{ isCreate: boolean; itemData:any}> = {
      height: '60vh',
      width: '600px',
      maxHeight: '90vh',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isCreate: false,
        itemData: this.data
      }
    };
    this.matdialog.open(CreateUpdateBrandComponent, dialogConfig).afterClosed().subscribe((data:any)=>{
      this.brandComponent.search();
    })
  }
  openModal(template: any){

  }
  deleteProduct(){

  }

}
