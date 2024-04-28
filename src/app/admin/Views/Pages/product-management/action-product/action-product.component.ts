import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../product.service";
import {ITooltipAngularComp} from "ag-grid-angular";
import {ITooltipParams} from "ag-grid-community";

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

  openModal(template:any){

  }
  updateRole(){

  }
  deleteRole(){

  }

  agInit(params: ITooltipParams): void {
  }
}
