import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {CartService} from "./cart.service";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit{
  allComplete: boolean = false;
  domainFile = environment.DOMAIN_FILE_SERVER
  tabSlected=0;// tab chọn hiển thị 0 trong giỏ, 1 đang giao hàng, 2 đã hoàn thành

  constructor(private cartService:CartService) {
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

  changeTab(number: number) {
    this.tabSlected=number;
  }
}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
