import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {CartService} from "./cart.service";
import {environment} from "../../../environment/environment";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
  CreateUpdateBrandComponent
} from "../../admin/Views/Pages/brand-management/create-update-brand/create-update-brand.component";
import {CreateOrderComponent} from "./create-order/create-order.component";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit{
  allComplete: boolean = false;
  domainFile = environment.DOMAIN_FILE_SERVER
  tabSlected=0;// tab chọn hiển thị 0 trong giỏ, 1 đang giao hàng, 2 đã hoàn thành

  constructor(private cartService:CartService,
              private dialog: MatDialog,
              private toast:ToastrService) {
  }
  task:Task  = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };
  someComplete(): boolean {
    if (this.rowData == null) {
      return false;
    }
    return this.rowData.filter((t:any) => t.slected).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.rowData == null) {
      return;
    }
    this.rowData.forEach((t:any) => (t.slected = completed));
  }
  updateAllComplete() {
    this.allComplete = this.rowData.every((t:any) => t.slected);
  }

  ngOnInit(): void {
    const userStr = localStorage.getItem("user");
    if(userStr) {
      const user = JSON.parse(userStr)
      this.cartService.getAllCart(user?.id).subscribe((data:any)=>{
        this.rowData=data.data;
      })
    }
  }
  rowData:any;
  decrease(item:any) {
    if (item.quantity > 0) {
      item.quantity--
    }
  }
  increase(item:any) {
    item.quantity++
  }
  sumProduct(type:number){
    if(type===1){
      let sumProduct=0;
      this.rowData.forEach((item:any)=>{
        if(item.slected){
          sumProduct+=item.quantity;
        }
      })
      return sumProduct;
    }else if(type===2){
      let sumPriceProduct=0;
      this.rowData.forEach((item:any)=>{
        if(item.slected){
          if(item.maxPurchase){
            sumPriceProduct+=(item.quantity*(item.price*((100-item.maxPurchase)/100)));
          }else{
            sumPriceProduct+=(item.quantity*item.price);
          }
        }
      })
      return sumPriceProduct;
    }else{
      return 0
    }

  }

  changeTab(number: number) {
    this.tabSlected=number;
  }

  createOrder() {
    let productOrder=this.rowData.filter((item:any)=>item.slected)
    if(productOrder.length==0){
      this.toast.warning("Bạn cần chọn sản phẩm trước khi thực hiện đặt hàng")
    }else{
      const dialogConfig={
        height: '80vh',
        width:'700px',
        maxHeight: '90vh',
        maxWidth: '90vw',
        disableClose: false,
        hasBackdrop: true,
        data: productOrder
      };
      this.dialog.open(CreateOrderComponent, dialogConfig).afterClosed().subscribe((data:any)=>
        {
          // this.search()
        }
      )
    }
  }
}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
