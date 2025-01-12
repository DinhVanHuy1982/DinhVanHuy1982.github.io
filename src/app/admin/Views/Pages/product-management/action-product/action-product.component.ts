import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../product.service";
import {ITooltipAngularComp} from "ag-grid-angular";
import {ITooltipParams} from "ag-grid-community";
import {CreateUpdateRoleComponent} from "../../role-management/create-update-role/create-update-role.component";
import {CreateUpdateProductComponent} from "../create-update-product/create-update-product.component";
import {UserService} from "../../../../../viewsShare/Views/user.service";
import {ProductManagementComponent} from "../product-management.component";

@Component({
  selector: 'app-action-product',
  templateUrl: './action-product.component.html',
  styleUrls: ['./action-product.component.scss']
})
export class ActionProductComponent implements ITooltipAngularComp{
  action:any;
  disableDelete=false;
  constructor(
    private toast:ToastrService,
    public matdialog: MatDialog,
    private productService: ProductService,
    private userService:UserService,
    private productComponent:ProductManagementComponent
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
      height: '600px',
      width: '600px',
      disableClose: false,
      hasBackdrop: true,
      data: {
        isCreate: false,
        itemData: this.data
      }
    };
    this.matdialog.open(CreateUpdateProductComponent, dialogConfig).afterClosed().subscribe((data:any)=>

        this.productComponent.search()
    )
  }
  deleteProduct(){
    this.productService.deleteProduct(this.data.id).subscribe((res:any)=>{
      if(res.status==="OK"){
        this.toast.success("Xóa sản phẩm thành công")
      }else{
        this.toast.error(res.message)
      }
    })
  }

  agInit(params: ITooltipParams): void {
    this.data=params.data;
  }
}
